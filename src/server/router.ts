import * as trpc from "@trpc/server";
import { TRPCError } from '@trpc/server';
import { z } from "zod";

import { Context } from "./context";
import { samplePokemonData } from "../utils/sampleData";

interface filter {
  [key:string]: {
      [key:string]: string
  }
}

export const serverRouter = trpc
  .router<Context>()
  .query("getAll", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.pokemon.findMany();
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
        const res = await ctx.prisma.pokemon.findFirst({
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
        names: z.string().array(),
    }),
    resolve: async ({ input, ctx }) => {
          const namesList: filter[] = input.names.map(name => (
            {
                'name': {
                    'equals': name
                }
            }
        ))
        const res = await ctx.prisma.pokemon.findMany({
            where: {
                OR: namesList
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
        types: z.string().array(),
    }),
    resolve: async ({ input, ctx }) => {
        const typesList: filter[] = input.types.map(type => (
            {
                'type': {
                    'equals': type
                }
            }
        ))
        const res = await ctx.prisma.pokemon.findMany({
            where: {
                OR: typesList
              }
        });
        if (!res) {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: `No pokemon with types ${input.types}`,
            });
        }
        return res;
    },
  });

export type ServerRouter = typeof serverRouter;