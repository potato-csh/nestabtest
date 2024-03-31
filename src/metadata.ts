/* eslint-disable */
export default async () => {
    const t = {
        ["./modules/experiment/constants"]: await import("./modules/experiment/constants"),
        ["./modules/experiment/entities/experiment.entity"]: await import("./modules/experiment/entities/experiment.entity"),
        ["./modules/experiment/entities/layer.entity"]: await import("./modules/experiment/entities/layer.entity")
    };
    return { "@nestjs/swagger": { "models": [[import("./modules/experiment/dtos/experiment.dto"), { "QueryExperimentDto": { name: { required: false, type: () => String, description: "\u5B9E\u9A8C\u540D\u79F0" }, status: { required: false, description: "\u5B9E\u9A8C\u72B6\u6001", enum: t["./modules/experiment/constants"].ExperimentStatus }, layer: { required: false, type: () => String, description: "\u5B9E\u9A8C\u56FE\u5C42" }, page: { required: false, type: () => Number, description: "\u9875\u6570, \u4E0D\u80FD\u5C0F\u4E8E1", default: 1, minimum: 1 }, limit: { required: false, type: () => Number, description: "\u6BCF\u9875\u6761\u6570, \u4E0D\u80FD\u5C0F\u4E8E1", default: 10, minimum: 1 } }, "CreateExperimentDto": { name: { required: true, type: () => String, description: "\u5B9E\u9A8C\u540D\u79F0", maxLength: 255 }, description: { required: false, type: () => String, description: "\u5B9E\u9A8C\u63CF\u8FF0", maxLength: 1024 }, layer: { required: true, type: () => String, description: "\u5B9E\u9A8C\u56FE\u5C42ID" }, originUrl: { required: true, type: () => String, description: "\u6E90URL", maxLength: 512 }, testType: { required: true, description: "\u6D4B\u8BD5\u7C7B\u578B", enum: t["./modules/experiment/constants"].TestType }, testUrl: { required: true, type: () => String, description: "\u6D4B\u8BD5URL", maxLength: 512 }, samplingType: { required: true, description: "\u91C7\u6837\u7C7B\u578B", enum: t["./modules/experiment/constants"].SamplingType }, samplingRate: { required: true, type: () => Number, description: "\u91C7\u6837\u7387(1-50)", minimum: 1, maximum: 50 }, customSamplingRange: { required: false, type: () => String, description: "\u81EA\u5B9A\u4E49\u91C7\u6837\u8303\u56F4", maxLength: 255 }, whiteList: { required: false, type: () => String, description: "\u767D\u540D\u5355", maxLength: 2048 }, balackList: { required: false, type: () => String, description: "\u9ED1\u540D\u5355", maxLength: 2048 }, startTimePreset: { required: false, type: () => Date, description: "\u9884\u542F\u52A8\u65F6\u95F4" }, endTimePreset: { required: false, type: () => Date, description: "\u9884\u505C\u6B62\u65F6\u95F4" } }, "UpdateExperimentDto": { id: { required: true, type: () => String, description: "\u5B9E\u9A8CID" } } }], [import("./modules/experiment/entities/layer.entity"), { "LayerEntity": { id: { required: true, type: () => String }, name: { required: true, type: () => String }, type: { required: true, type: () => String }, description: { required: true, type: () => String }, originUrl: { required: true, type: () => String }, hashSet: { required: true, type: () => String }, createTime: { required: true, type: () => Date }, updateTime: { required: true, type: () => Date }, experiments: { required: true, type: () => [t["./modules/experiment/entities/experiment.entity"].ExperimentEntity] } } }], [import("./modules/experiment/entities/experiment.entity"), { "ExperimentEntity": { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, originUrl: { required: true, type: () => String }, testType: { required: true, enum: t["./modules/experiment/constants"].TestType }, testUrl: { required: true, type: () => String }, samplingType: { required: true, enum: t["./modules/experiment/constants"].SamplingType }, samplingRate: { required: true, type: () => Number }, status: { required: true, enum: t["./modules/experiment/constants"].ExperimentStatus }, whiteList: { required: true, type: () => String }, blackList: { required: true, type: () => String }, hitCount: { required: true, type: () => Number }, hitKeyCount: { required: true, type: () => Number }, hashSet: { required: true, type: () => String }, startTimePreset: { required: true, type: () => Date }, endTimePreset: { required: true, type: () => Date }, startTimeReal: { required: true, type: () => Date }, endTimeReal: { required: true, type: () => Date }, createTime: { required: true, type: () => Date }, updateTime: { required: true, type: () => Date }, layer: { required: true, type: () => t["./modules/experiment/entities/layer.entity"].LayerEntity } } }], [import("./modules/experiment/dtos/layer.dto"), { "QueryLayerDto": { page: { required: false, type: () => Number, description: "\u9875\u6570, \u4E0D\u80FD\u5C0F\u4E8E1", default: 1, minimum: 1 }, limit: { required: false, type: () => Number, description: "\u6BCF\u9875\u6761\u6570, \u4E0D\u80FD\u5C0F\u4E8E1", default: 10, minimum: 1 } }, "CreateLayerDto": { name: { required: true, type: () => String, description: "\u56FE\u5C42\u540D\u79F0", maxLength: 255 }, type: { required: true, type: () => String, description: "\u56FE\u5C42\u7C7B\u578B", maxLength: 255 }, description: { required: false, type: () => String, description: "\u56FE\u5C42\u63CF\u8FF0", maxLength: 255 }, originUrl: { required: true, type: () => String, description: "\u56FE\u5C42\u94FE\u63A5", maxLength: 255 } }, "UpdateLayerDto": { id: { required: true, type: () => String, description: "\u56FE\u5C42ID" } } }]], "controllers": [[import("./modules/experiment/controllers/experiment.controller"), { "ExperimentController": { "list": { summary: "\u83B7\u53D6\u5B9E\u9A8C\u5217\u8868" }, "detail": { summary: "\u83B7\u53D6\u5B9E\u9A8C\u8BE6\u60C5", type: t["./modules/experiment/entities/experiment.entity"].ExperimentEntity }, "create": { summary: "\u521B\u5EFA\u5B9E\u9A8C", type: t["./modules/experiment/entities/experiment.entity"].ExperimentEntity }, "update": { summary: "\u4FEE\u6539\u5B9E\u9A8C", type: t["./modules/experiment/entities/experiment.entity"].ExperimentEntity }, "delete": { summary: "\u5220\u9664\u5B9E\u9A8C", type: t["./modules/experiment/entities/experiment.entity"].ExperimentEntity } } }], [import("./modules/experiment/controllers/layer.controller"), { "LayerController": { "list": { summary: "\u83B7\u53D6\u5B9E\u9A8C\u56FE\u5C42\u5217\u8868" }, "detail": { summary: "\u83B7\u53D6\u5B9E\u9A8C\u56FE\u5C42\u8BE6\u60C5", type: t["./modules/experiment/entities/layer.entity"].LayerEntity }, "create": { summary: "\u521B\u5EFA\u5B9E\u9A8C\u56FE\u5C42", type: t["./modules/experiment/entities/layer.entity"].LayerEntity }, "update": { summary: "\u66F4\u65B0\u5B9E\u9A8C\u56FE\u5C42", type: t["./modules/experiment/entities/layer.entity"].LayerEntity }, "delete": { summary: "\u5220\u9664\u5B9E\u9A8C\u56FE\u5C42", type: t["./modules/experiment/entities/layer.entity"].LayerEntity } } }]] } };
};