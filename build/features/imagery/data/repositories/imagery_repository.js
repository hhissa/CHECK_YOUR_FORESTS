var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ImageryRepository } from "../../domain/repositories/imagery_repository";
import { ImageryError } from "../../../../core/error/imagery_error";
;
export class ImageryRepositoryImpl extends ImageryRepository {
    constructor(remoteDataSource, localDataSource, networkTest) {
        super();
        this.remoteDataSource = remoteDataSource;
        this.localDataSource = localDataSource;
        this.networkTest = networkTest;
    }
    getRGBImagery(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getImagery(this.remoteDataSource.getRGBImagery, params);
        });
    }
    getNDVIImagery(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getImagery(this.remoteDataSource.getNDVIImagery, params);
        });
    }
    getImagery(lambda, params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.networkTest.Test()) {
                console.log("trying imagery");
                try {
                    let imagery = yield lambda(params);
                    console.log("got Imagery");
                    //await this.localDataSource.cacheImagery(imagery);
                    return imagery;
                }
                catch (error) {
                    return new ImageryError("Failed to get RGB Imagery");
                }
            }
            else {
                try {
                    let imagery = yield this.localDataSource.getLastImagery();
                    return imagery;
                }
                catch (error) {
                    return new ImageryError("Unable to retrieve Cached Imagery");
                }
            }
        });
    }
}
;
