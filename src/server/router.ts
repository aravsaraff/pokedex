import * as trpc from "@trpc/server";
import { TRPCError } from '@trpc/server';
import { z } from "zod";

import { Context } from "./context";
import { samplePokemonData } from "../utils/sampleData";

export const serverRouter = trpc
  .router<Context>()
  .query("getAll", {
    input: z.object({
      page: z.number().min(1),
      limit: z.number().min(1).max(100),
    }),
    resolve: async ({ input, ctx }) => {
      const offset = (input.page - 1) * input.limit;
      const pokemons = await ctx.prisma.pokemon.findMany({
        skip: offset,
        take: input.limit,
      });
      const total = await ctx.prisma.pokemon.count();
      return {
        pokemons,
        total
      };
    },
  })
  .mutation("createSample", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.pokemon.createMany({
        data: samplePokemonData
      });
    },
  })
  .query("get", {
    input: z.object({
        name: z.string()
    }),
    resolve: async ({ input, ctx }) => {
        const res = await ctx.prisma.pokemon.findUnique({
            where: {
                name: input.name
            }
        });
        if (!res) {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: `No pokemon with name '${input.name}'`,
            });
        }
        return res
    },
  })
  .query("filterByName", {
    input: z.object({
        names: z.string().array()
    }),
    resolve: async ({ input, ctx }) => {
        const res = await ctx.prisma.pokemon.findMany({
            where: {
                name: {
                  in: input.names
                }
              }
        });
        if (!res) {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: `No pokemon with names ${input.names}`,
            });
        }
        return res;
    },
  })
  .query("filterByType", {
    input: z.object({
        type: z.string().optional(),
    }),
    resolve: async ({ input, ctx }) => {
      if (!input) {
        return await ctx.prisma.pokemon.findMany();
      }
        const res = await ctx.prisma.pokemon.findMany({
            where: {
              types: {
                has: input.type
              } 
            }
        });
        if (!res) {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: `No pokemon with types ${input.type}`,
            });
        }
        return res;
    },
  })
  .query("getAvailableTypes", {
    resolve: async ({ ctx }) => {
      const existingTypes = await ctx.prisma.pokemon.findMany({
        select: {
          types: true,
        },
      });
      const uniqueTypes = new Set<string>();
      existingTypes.forEach((pokemon) => {
        pokemon.types.forEach((type) => {
          uniqueTypes.add(type);
        });
      });
      return Array.from(uniqueTypes);
    }
  });

export type ServerRouter = typeof serverRouter;