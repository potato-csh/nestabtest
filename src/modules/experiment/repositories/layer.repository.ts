import { BaseRepository } from '@/modules/database/base/repository';
import { CustomRepository } from '@/modules/database/decorators';

import { LayerEntity } from '../entities/layer.entity';

@CustomRepository(LayerEntity)
export class LayerRepository extends BaseRepository<LayerEntity> {
    protected _qbName = 'layer';
}
