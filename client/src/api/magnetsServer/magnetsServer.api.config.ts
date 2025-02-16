/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  BasketApi,
  Configuration,
  PricesAndSizesApi,
  ProductCategoriesApi,
  ProductsApi,
  ResponseError,
} from './generated';

class MagnetsServerApi {
  public productService: ProductsApi;
  public productCategoriesService: ProductCategoriesApi;
  public priceAndSizeService: PricesAndSizesApi;
  public basketService: BasketApi;

  constructor() {
    const SERVER_URL =
      import.meta.env.VITE_PROD === 'true'
        ? import.meta.env.VITE_API_SERVER_URL_PROD
        : import.meta.env.VITE_API_SERVER_URL_DEV;

    const configuration = new Configuration({
      basePath: SERVER_URL,
      headers: {
        // 'X-API-KEY': API_KEY!,
      },
    });

    this.productService = errorHandler(new ProductsApi(configuration));
    this.productCategoriesService = errorHandler(
      new ProductCategoriesApi(configuration)
    );
    this.priceAndSizeService = errorHandler(
      new PricesAndSizesApi(configuration)
    );
    this.basketService = errorHandler(new BasketApi(configuration));

    function errorHandler(service: any) {
      return new Proxy(service, {
        get: function (target, method) {
          if (typeof target[method] === 'function') {
            return async function (...values: any) {
              try {
                const result = await target[method](...values);
                return result;
              } catch (error) {
                if (error instanceof ResponseError) {
                  const ResponseError = await error.response.json();
                  console.error(ResponseError);

                  // Handle specific error codes here if needed
                  switch (ResponseError.errorCode) {
                    default:
                      console.error(
                        'Unhandled error code:',
                        ResponseError.errorCode
                      );
                      break;
                  }
                }
                throw error; // Ensure the error is re-thrown
              }
            };
          }

          return target[method];
        },
      });
    }
  }
}

const magnetsServerApi = new MagnetsServerApi();
export default magnetsServerApi;
