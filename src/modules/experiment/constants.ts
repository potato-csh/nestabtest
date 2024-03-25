export enum ExperimentStatus {
    PENDING = 'PENDING',
    RUNNING = 'RUNNING',
    STOPPED = 'STOPPED',
    DELETED = 'DELETED',
}

export enum SamplingType {
    AUTOMATIC = 'AUTOMATIC',
    CUSTOM = 'CUSTOM',
}

export enum TestType {
    ABTEST = 'ABTEST',
    INTERLEAVING = 'INTERLEAVING',
}
