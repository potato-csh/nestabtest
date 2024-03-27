import {
    ClassSerializerContextOptions,
    ClassSerializerInterceptor,
    PlainLiteralObject,
    StreamableFile,
} from '@nestjs/common';
import { isArray, isNil, isObject } from 'lodash';

export class AppInterceptor extends ClassSerializerInterceptor {
    serialize(
        response: PlainLiteralObject | PlainLiteralObject[],
        options: ClassSerializerContextOptions,
    ): PlainLiteralObject | PlainLiteralObject[] {
        if ((!isObject(response) && !isArray(response)) || response instanceof StreamableFile) {
            return response;
        }
        /**
         * 如果是响应数据是数组,则遍历对每一项进行序列化
         */
        if (isArray(response)) {
            return (response as PlainLiteralObject[]).map((item) =>
                this.transformToPlain(item, options),
            );
        }
        /**
         * 如果是分页数据,则对items中的每一项进行序列化
         */
        if ('meta' in response && 'items' in response) {
            const items = !isNil(response.items && isArray(response.items)) ? response.items : [];
            return {
                ...response,
                items: (items as PlainLiteralObject[]).map((item) =>
                    this.transformToPlain(item, options),
                ),
            };
        }
        /**
         * 如果是响应数据是对象，直接进行序列化
         */
        return this.transformToPlain(response, options);
    }
}
