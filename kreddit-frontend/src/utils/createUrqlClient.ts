import { Cache, cacheExchange, NullArray, ResolveInfo, Resolver } from '@urql/exchange-graphcache';
import { dedupExchange, fetchExchange } from 'urql';
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from '../generated/graphql';
import { betterUpdateQuery } from './betterUpdateQuery';

import { simplePagination } from '@urql/exchange-graphcache/extras';
import { VariablesAreInputTypesRule } from 'graphql';

export type MergeMode = 'before' | 'after';

export interface PaginationParams {
  cursorArgument?: string;
}

const cursorPagination = (): Resolver => {
  return (_parent: any, fieldArgs: any, cache: Cache, info: ResolveInfo) => {
    const { parentKey: entityKey, fieldName } = info;
    // console.log(entityKey, fieldName);
    // entity key = query, fieldname = posts

    //  get all querys in cache
    const allFields = cache.inspectFields(entityKey);
    // console.log('allfields', allFields);
    // filter querys by fieldname  in this case posts querys
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    // resolve(entity: Entity, fieldName: string, args?: FieldArgs): DataField;

    // const results: string[] = [];
    // for (let i = 0; i < size; i++) {
    //   const { fieldKey } = fieldInfos[i];
    //   const data = cache.resolve(entityKey, fieldKey) as string[];
    //   console.log('data', data);
    //   results.push(...data)
    // }
    // return results
    // console.log('fieldargs', fieldArgs);

    const visited = new Set();
    let result: NullArray<string> = [];
    let prevOffset: number | null = null;

    for (let i = 0; i < size; i++) {
      //   const { fieldKey, arguments: args } = fieldInfos[i];
      //   if (args === null || !compareArgs(fieldArgs, args)) {
      //     continue;
      //   }
      const { fieldKey } = fieldInfos[i];
      const data = cache.resolve(entityKey, fieldKey) as string[];

      //   if (
      //     links === null ||
      //     links.length === 0 ||
      //     typeof currentOffset !== 'number'
      //   ) {
      //     continue;
      //   }

      //   const tempResult: NullArray<string> = [];

      //   for (let j = 0; j < links.length; j++) {
      //     const link = links[j];
      //     if (visited.has(link)) continue;
      //     tempResult.push(link);
      //     visited.add(link);
      //   }

      //   if (
      //     (!prevOffset || currentOffset > prevOffset) ===
      //     (mergeMode === 'after')
      //   ) {
      //     result = [...result, ...tempResult];
      //   } else {
      //     result = [...tempResult, ...result];
      //   }

      //   prevOffset = currentOffset;
      // }

      // const hasCurrentPage = cache.resolve(entityKey, fieldName, fieldArgs);
      // if (hasCurrentPage) {
      //   return result;
      // } else if (!(info as any).store.schema) {
      //   return undefined;
      // } else {
      //   info.partial = true;
      //   return result;
      // }
    }
  };
};

export const createUrqlClient = (ssrExchange: any) => ({
  url: 'http://localhost:4000/graphql',
  exchanges: [
    dedupExchange,
    cacheExchange({
      resolvers: {
        Query: {
          posts: simplePagination({
            limitArgument: 'limit',
            offsetArgument: 'offset',
            mergeMode: 'after',
          }),
        },
      },
      updates: {
        Mutation: {
          login: (_result, args, cache, info) => {
            //  cache.updateQuery({ query: MeDocument}, (data: MeQuery) => {});
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              }
            );
          },
          register: (_result, args, cache, info) => {
            //  cache.updateQuery({ query: MeDocument}, (data: MeQuery) => {});
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              }
            );
          },
          logout: (result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(cache, { query: MeDocument }, {}, () => ({
              me: null,
            }));
          },
        },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
  fetchOptions: {
    credentials: 'include' as const,
  },
});
