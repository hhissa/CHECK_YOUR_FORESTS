import { Imagery } from "../../domain/entities/imagery_entity";
import { ImageryRepository } from "../../domain/repositories/imagery_repository";
import { ImageryRemoteDataSource } from "../datasources/imagery_remote_data_source";
import { ImageryLocalDataSource } from "../datasources/imagery_local_data_source";
import { NetworkTest } from "../../../../core/network_test";
import { ImageryError } from "../../../../core/error/imagery_error";

interface Params {
  date: Date;
  bbox: number[][];
};

export class ImageryRepositoryImpl extends ImageryRepository {
  private remoteDataSource: ImageryRemoteDataSource;
  private localDataSource: ImageryLocalDataSource;
  private networkTest: NetworkTest;

  constructor(remoteDataSource: ImageryRemoteDataSource, localDataSource: ImageryLocalDataSource, networkTest: NetworkTest) {
    super();
    this.remoteDataSource = remoteDataSource;
    this.localDataSource = localDataSource;
    this.networkTest = networkTest;

  }
  public async getRGBImagery(params: Params): Promise<Imagery> {
    return await this.getImagery(this.remoteDataSource.getRGBImagery, params);
  }

  public async getNDVIImagery(params: Params): Promise<Imagery> {
    return await this.getImagery(this.remoteDataSource.getNDVIImagery, params);

  }
  private async getImagery(lambda: Function, params: Params): Promise<Imagery> {

    if (this.networkTest.Test()) {
      console.log("trying imagery")
      try {
        let imagery = await lambda(params);
        console.log("got Imagery")
        await this.localDataSource.cacheImagery(imagery);
        return imagery;
      } catch (error) {
        return new ImageryError("Failed to get RGB Imagery");
      }
    } else {
      try {
        let imagery = await this.localDataSource.getLastImagery();
        return imagery;
      } catch (error) {
        return new ImageryError("Unable to retrieve Cached Imagery");
      }
    }

  }
};


