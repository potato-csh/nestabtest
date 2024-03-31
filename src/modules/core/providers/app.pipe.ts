import { ArgumentMetadata, BadRequestException, Paramtype, ValidationPipe } from '@nestjs/common';

import { isObject, omit } from 'lodash';

import { DTO_VALIDATION_OPTIONS } from '../constants';
import { deepMerge } from '../helpers';

export class AppPipe extends ValidationPipe {
    async transform(value: any, metadata: ArgumentMetadata) {
        // 1. 获取当前验证参数的DTO类(通过`design:paramtypes`获取参数值的类型)以及请求数据的类型
        const { metatype, type } = metadata;
        const dto = metatype as any;
        // 2. 通过`metadata`获取这个DTO类上的自定义验证选项(包含了序列化选项等，请看上述装饰器)
        const options = Reflect.getMetadata(DTO_VALIDATION_OPTIONS, dto) || {};
        // 3. 把默认父类已经设置的验证选项给结构赋值给一个常量(防止覆盖下一次验证，因为全局管道是单例的提供者)
        const originOptions = { ...this.validatorOptions };
        // 4. 把父类已经设置的默认序列化选项赋值给一个常量(与验证选项同理)
        const originTransform = { ...this.transformOptions };
        // 5. 把自定义选项给结构出来，获取自定义的序列化和验证选项，以及当前DTO类需要验证的请求数据类型(比如`body`,`query`等，具体查看`optionsType`类型)
        const { transformOptions, type: optionsType, ...customOptions } = options;

        // 6. 如果没有自定义设置待验证的请求数据类型，则默认为验证`body`数据
        const requestType: Paramtype = optionsType ?? 'body';

        // 7. 如果请求数据的类型与当前DTO设置待验证的请求数据类型不一致(
        // 比如你发送的是`query`数据，但是待验证的是`body`)，
        // 则直接返回值而不进行验证，除非你有与该数据类型匹配的DTO。
        // 比如一个请求可能同时有`query`和`body`，则在验证`query`时跳过`body`，验证`body`时跳过`query`,互不影响
        if (requestType !== type) return value;

        // 8. 使用`deepmerge`来深度合并自定义序列化选项以及父类自带的序列化选项获得最终的序列化选项
        if (transformOptions) {
            this.transformOptions = deepMerge(
                this.transformOptions,
                transformOptions ?? {},
                'replace',
            );
        }

        // 9. 同样地方法深度合并一下验证选项
        this.validatorOptions = deepMerge(this.validatorOptions, customOptions ?? {}, 'replace');

        // 10. 设置待验证的值
        // 判断请求数据是否为一个对象，如果不是则其值本身就是就是待验证的值(比如只传入一个字符串)，
        // 如果请求数据是一个对象(包含数组)，则遍历其中的值，
        // 如果是一个文件上传类型的值或者一个对象，则去除这个值中的`fields`属性
        const toValidate = isObject(value)
            ? Object.fromEntries(
                  Object.entries(value as Record<string, any>).map(([key, v]) => {
                      if (!isObject(v) || !('mimetype' in v)) return [key, v];
                      return [key, omit(v, ['fields'])];
                  }),
              )
            : value;

        try {
            // 11. 使用父类的`transform`方法进行验证并返回序列化后的值
            let result = await super.transform(toValidate, metadata);
            if (typeof result.transform === 'function') {
                result = await result.transform(result);
                const { transform, ...data } = result;
                result = data;
            }
            // 12. 重置默认验证和序列化选项为前面我们通过常量存储的父类自带的选项
            this.transformOptions = originTransform;
            this.validatorOptions = originOptions;
            return result;
        } catch (error: any) {
            this.transformOptions = originTransform;
            this.validatorOptions = originOptions;
            if ('response' in error) throw new BadRequestException(error.response);
            throw new BadRequestException(error);
        }
    }
}
