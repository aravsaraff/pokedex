import * as trpc from "@trpc/server";
import { z } from "zod";

import type { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { prisma } from './prisma';

import superjson from 'superjson';
import { Context } from "./context";

import { createCallerFactory, publicProcedure, router } from './trpc';

const t = trpc.initTRPC.context<Context>().create({
	transformer: superjson,
  });

export const appRouter = router({
	getAll: publicProcedure 
		.query(async () => {
			return await prisma.pokemon.findMany();
		}),
	create: publicProcedure
		.input(
			z.object({
				name: z.string(),
				type: z.string(),
				sprite: z.string()
			})
		)
		.mutation(async ({ input }) => {
			return await prisma.pokemon.create({
				data: {
					name: input.name,
					type: input.type,
					sprite: input.sprite
				}
			});
		}),
	get: publicProcedure
		.input(
			z.object({
				name: z.string()
			})
		)
		.query(async ({ input}) => {
			const res = await prisma.pokemon.findFirst({
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
		}),
	filterByType: publicProcedure
		.input(
			z.object({
				types: z.string().array(),
			})
		)
		.query(async ({ input }) => {
			interface filter {
				[key:string]: {
					[key:string]: string
				}
			}
      		let typesList: filter[] = input.types.map(type => (
				{
					'type': {
						'equals': type
					}
				}
			))
			const res = await prisma.pokemon.findMany({
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
		})

})
	
export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;