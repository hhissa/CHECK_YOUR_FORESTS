import { NetworkTest } from "../../../../core/network_test";
import { ImageryLocalDataSourceImpl } from "../../data/datasources/imagery_local_data_source";
import { ImageryRemoteDataSourceImpl } from "../../data/datasources/imagery_remote_data_source";
import { ImageryRepositoryImpl } from "../../data/repositories/imagery_repository";
import { GetImagery } from "../../domain/usecases/imagery_usecase";


export function spinup() {
  const network = new NetworkTest();
  const remotedatasource = new ImageryRemoteDataSourceImpl()
  const localdatasource = new ImageryLocalDataSourceImpl();
  const repository = new ImageryRepositoryImpl(remotedatasource, localdatasource, network)
  const usecase = new GetImagery(repository)

  return usecase;
}


