import { ImageryRepository } from "../repositories/imagery_repository";
import { Imagery } from "../entities/imagery_entity";
class GetImagery {
  repository: ImageryRepository;
  constructor(repository: ImageryRepository) {
    this.repository = repository;
  }

  public async execute(params : Params): Promise<Imagery> {
    return await this.repository.GetImagery(params.date, params.bbox);
  }
};

interface Params {
  date: Date;
  bbox: [[number, number], [number, number]];
};
