import { Imagery } from "../../domain/entities/imagery_entity";
import { ImageryRepository } from "../../domain/repositories/imagery_repository";
import { ImageryRemoteDataSource } from "../datasources/imagery_remote_data_source";
import { ImageryLocalDataSource } from "../datasources/imagery_local_data_source";
import { ImageryModel } from "../models/imagery_model";
import { NetworkTest } from "../../../../core/network_test";

interface Params {
  date: Date;
  bbox: [[number, number], [number, number]];
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
    //TODO: implement get imagery function 
    if (this.networkTest.Test()) {
      try {
        let imagery = await this.remoteDataSource.getRGBImagery(params);
        await this.localDataSource.cacheImagery(imagery);
        return imagery;
      } catch (error) {
        return new Error("Failed to get RGB Imagery");
      }
    } else {
      try {
        let imagery = await this.localDataSource.getLastImagery();
        return imagery;
      } catch (error) {
        return new Error("Unable to retrieve Cached Imagery");
      }

    }

    return null;
  }

  public async getNDVIImagery(params: Params): Promise<Imagery> {
    //TODO implement get imagery function
    return null;
  }

  private async getImagery()
};


