/**
 * Prisma Client instance.
 *
 * This module exports a single instance of the Prisma Client, which is used to interact
 * with the database. Prisma Client is an auto-generated query builder that provides a
 * type-safe interface to the database. The instance is created once and used throughout
 * the application to perform database operations.
 *
 * @module prisma
 * @see https://www.prisma.io/docs
 *
 * @example
 * const prisma = require('@config/database.config');
 * const users = await prisma.user.findMany();
 *
 * @returns {PrismaClient} The Prisma Client instance for interacting with the database.
 */
const { PrismaClient } = require('@prisma/client');

module.exports = new PrismaClient();
