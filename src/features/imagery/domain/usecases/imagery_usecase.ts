import { ImageryRepository } from "../repositories/imagery_repository";
import { Imagery } from "../entities/imagery_entity";
export class GetImagery {
  repository: ImageryRepository;
  constructor(repository: ImageryRepository) {
    this.repository = repository;
  }

  public async executeRGB(params: Params): Promise<Imagery> {
    return await this.repository.getRGBImagery(params);
  }
  public async executeNDVI(params: Params): Promise<Imagery> {
    return await this.repository.getNDVIImagery(params);
  }
}

interface Params {
  date: Date;
  bbox: number[][];
}
