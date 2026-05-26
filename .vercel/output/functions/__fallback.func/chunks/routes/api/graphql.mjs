import { ApolloServer } from '@apollo/server';
import { startServerAndCreateH3Handler } from '@as-integrations/h3';
import { GraphQLScalarType, Kind } from 'graphql';
import { a as auth, d as db, f as financialGoals, r as recurringTransactions, b as budgets, t as transactions, c as categories, w as wallets } from '../../_/auth.mjs';
import { and, eq } from 'drizzle-orm';
import { U as useRuntimeConfig } from '../../nitro/nitro.mjs';
import { Redis } from '@upstash/redis';
import { Duration } from 'effect';
import 'better-auth/adapters/drizzle';
import 'drizzle-orm/libsql';
import '@libsql/client';
import 'drizzle-orm/sqlite-core';
import 'better-auth/plugins';
import 'better-auth';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'lru-cache';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue-router';
import '@iconify/utils';
import 'consola';
import 'xss';

const typeDefs = `scalar DateTime

enum TransactionType {
  income
  expense
  transfer
}

enum WalletType {
  cash
  bank
  credit
  investment
}

enum BudgetPeriod {
  monthly
  yearly
}

enum RecurringFrequency {
  daily
  weekly
  monthly
  yearly
}

enum InvitationStatus {
  pending
  accepted
  rejected
  cancelled
}

enum MemberRole {
  owner
  admin
  member
}

type User {
  id: ID!
  name: String!
  email: String!
  emailVerified: Boolean!
  image: String
  username: String
  displayUsername: String
  createdAt: DateTime!
  updatedAt: DateTime!
  wallets: [Wallet!]!
  categories: [Category!]!
  transactions: [Transaction!]!
  budgets: [Budget!]!
  recurringTransactions: [RecurringTransaction!]!
  financialGoals: [FinancialGoal!]!
  members: [Member!]!
}

type Organization {
  id: ID!
  name: String!
  slug: String!
  logo: String
  metadata: String
  createdAt: DateTime!
  members: [Member!]!
  invitations: [Invitation!]!
  wallets: [Wallet!]!
  categories: [Category!]!
  transactions: [Transaction!]!
  budgets: [Budget!]!
  recurringTransactions: [RecurringTransaction!]!
  financialGoals: [FinancialGoal!]!
}

type Member {
  id: ID!
  role: String!
  createdAt: DateTime!
  organization: Organization!
  user: User!
}

type Invitation {
  id: ID!
  email: String!
  role: String
  status: InvitationStatus!
  expiresAt: DateTime!
  createdAt: DateTime!
  organization: Organization!
  inviter: User!
}

type Wallet {
  id: ID!
  name: String!
  type: String!
  balance: Int!
  currency: String!
  createdAt: DateTime!
  user: User!
  organization: Organization
  transactions: [Transaction!]!
  recurringTransactions: [RecurringTransaction!]!
  financialGoals: [FinancialGoal!]!
}

type Category {
  id: ID!
  name: String!
  icon: String
  type: String!
  createdAt: DateTime!
  user: User!
  organization: Organization
  transactions: [Transaction!]!
  budgets: [Budget!]!
}

type Transaction {
  id: ID!
  amount: Int!
  type: TransactionType!
  description: String
  currency: String!
  exchangeRate: Int!
  date: DateTime!
  createdAt: DateTime!
  wallet: Wallet!
  toWallet: Wallet
  category: Category
  user: User!
  organization: Organization
}

type Budget {
  id: ID!
  amount: Int!
  period: BudgetPeriod!
  createdAt: DateTime!
  category: Category!
  user: User!
  organization: Organization
}

type RecurringTransaction {
  id: ID!
  amount: Int!
  type: TransactionType!
  description: String
  frequency: RecurringFrequency!
  startDate: DateTime!
  nextRunDate: DateTime!
  lastRunDate: DateTime
  isActive: Boolean!
  createdAt: DateTime!
  wallet: Wallet!
  toWallet: Wallet
  category: Category
  user: User!
  organization: Organization
}

type FinancialGoal {
  id: ID!
  name: String!
  targetAmount: Int!
  currentAmount: Int!
  deadline: DateTime
  createdAt: DateTime!
  wallet: Wallet!
  user: User!
  organization: Organization
}

type Query {
  me: User
  wallets: [Wallet!]!
  wallet(id: ID!): Wallet
  categories(type: String): [Category!]!
  category(id: ID!): Category
  transactions(walletId: ID, categoryId: ID, type: TransactionType, from: DateTime, to: DateTime, limit: Int, offset: Int): [Transaction!]!
  transaction(id: ID!): Transaction
  budgets: [Budget!]!
  budget(id: ID!): Budget
  recurringTransactions(isActive: Boolean): [RecurringTransaction!]!
  recurringTransaction(id: ID!): RecurringTransaction
  financialGoals: [FinancialGoal!]!
  financialGoal(id: ID!): FinancialGoal
  organization(id: ID!): Organization
  organizations: [Organization!]!
}

type Mutation {
  createWallet(input: CreateWalletInput!): Wallet!
  updateWallet(id: ID!, input: UpdateWalletInput!): Wallet!
  deleteWallet(id: ID!): Boolean!
  createCategory(input: CreateCategoryInput!): Category!
  updateCategory(id: ID!, input: UpdateCategoryInput!): Category!
  deleteCategory(id: ID!): Boolean!
  createTransaction(input: CreateTransactionInput!): Transaction!
  updateTransaction(id: ID!, input: UpdateTransactionInput!): Transaction!
  deleteTransaction(id: ID!): Boolean!
  createBudget(input: CreateBudgetInput!): Budget!
  updateBudget(id: ID!, input: UpdateBudgetInput!): Budget!
  deleteBudget(id: ID!): Boolean!
  createRecurringTransaction(input: CreateRecurringTransactionInput!): RecurringTransaction!
  updateRecurringTransaction(id: ID!, input: UpdateRecurringTransactionInput!): RecurringTransaction!
  deleteRecurringTransaction(id: ID!): Boolean!
  createFinancialGoal(input: CreateFinancialGoalInput!): FinancialGoal!
  updateFinancialGoal(id: ID!, input: UpdateFinancialGoalInput!): FinancialGoal!
  deleteFinancialGoal(id: ID!): Boolean!
  createOrganization(input: CreateOrganizationInput!): Organization!
  inviteMember(organizationId: ID!, email: String!, role: String): Invitation!
  removeMember(memberId: ID!): Boolean!
}

input CreateWalletInput {
  name: String!
  type: String!
  balance: Int
  currency: String
  organizationId: ID
}

input UpdateWalletInput {
  name: String
  type: String
  currency: String
}

input CreateCategoryInput {
  name: String!
  icon: String
  type: String!
  organizationId: ID
}

input UpdateCategoryInput {
  name: String
  icon: String
  type: String
}

input CreateTransactionInput {
  amount: Int!
  type: TransactionType!
  description: String
  currency: String
  exchangeRate: Int
  date: DateTime!
  walletId: ID!
  toWalletId: ID
  categoryId: ID
  organizationId: ID
}

input UpdateTransactionInput {
  amount: Int
  description: String
  date: DateTime
  categoryId: ID
}

input CreateBudgetInput {
  amount: Int!
  period: BudgetPeriod
  categoryId: ID!
  organizationId: ID
}

input UpdateBudgetInput {
  amount: Int
  period: BudgetPeriod
}

input CreateRecurringTransactionInput {
  amount: Int!
  type: TransactionType!
  description: String
  frequency: RecurringFrequency!
  startDate: DateTime!
  walletId: ID!
  toWalletId: ID
  categoryId: ID
  organizationId: ID
}

input UpdateRecurringTransactionInput {
  amount: Int
  description: String
  frequency: RecurringFrequency
  isActive: Boolean
  categoryId: ID
}

input CreateFinancialGoalInput {
  name: String!
  targetAmount: Int!
  deadline: DateTime
  walletId: ID!
  organizationId: ID
}

input UpdateFinancialGoalInput {
  name: String
  targetAmount: Int
  currentAmount: Int
  deadline: DateTime
}

input CreateOrganizationInput {
  name: String!
  slug: String!
  logo: String
  metadata: String
}`;

async function createContext(event) {
  var _a, _b;
  const session = await auth.api.getSession({
    headers: event.headers
  });
  return {
    db,
    user: (_a = session == null ? void 0 : session.user) != null ? _a : null,
    session: (_b = session == null ? void 0 : session.session) != null ? _b : null
  };
}

function getRedis() {
  const runtimeConfig = useRuntimeConfig();
  return new Redis({
    url: runtimeConfig.upstashRedisRestUrl,
    token: runtimeConfig.upstashRedisRestToken
  });
}
const redis = getRedis();
async function invalidateUserCache(userId, orgId) {
  const patterns = [
    `layout:${userId}`,
    `dashboard:user:${userId}`,
    `wallets:user:${userId}`,
    `transactions:user:${userId}`,
    `categories:user:${userId}`,
    `chart:user:${userId}`,
    `budgets:user:${userId}`,
    `recurring:user:${userId}`,
    `goals:user:${userId}`
  ];
  if (orgId) {
    patterns.push(
      `dashboard:org:${orgId}`,
      `wallets:org:${orgId}`,
      `transactions:org:${orgId}`,
      `categories:org:${orgId}`,
      `chart:org:${orgId}`,
      `budgets:org:${orgId}`,
      `recurring:org:${orgId}`,
      `goals:org:${orgId}`
    );
  }
  await Promise.all(patterns.map((p) => backendCache.del(p)));
}
const colors = {
  reset: "\x1B[0m",
  dim: "\x1B[2m",
  cyan: "\x1B[36m",
  green: "\x1B[32m",
  yellow: "\x1B[33m",
  red: "\x1B[31m",
  magenta: "\x1B[35m"
};
const timestamp = () => {
  const now = /* @__PURE__ */ new Date();
  return now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
};
const log = {
  hit: (key, ms) => {
    console.log(
      `${colors.dim}${timestamp()}${colors.reset} ${colors.green}[cache]${colors.reset} ${colors.cyan}hit${colors.reset} ${colors.dim}${key} ${ms}ms${colors.reset}`
    );
  },
  miss: (key) => {
    console.log(
      `${colors.dim}${timestamp()}${colors.reset} ${colors.yellow}[cache]${colors.reset} ${colors.cyan}miss${colors.reset} ${colors.dim}${key}${colors.reset}`
    );
  },
  fetch: (key, ms) => {
    console.log(
      `${colors.dim}${timestamp()}${colors.reset} ${colors.cyan}[cache]${colors.reset} ${colors.dim}fetch${colors.reset} ${colors.dim}${key} (${ms}ms)${colors.reset}`
    );
  },
  set: (key) => {
    console.log(
      `${colors.dim}${timestamp()}${colors.reset} ${colors.green}[cache]${colors.reset} ${colors.dim}set${colors.reset} ${colors.dim}${key}${colors.reset}`
    );
  },
  invalidate: (pattern, count) => {
    console.log(
      `${colors.dim}${timestamp()}${colors.reset} ${colors.magenta}[cache]${colors.reset} ${colors.dim}invalidate${colors.reset} ${colors.dim}${pattern} (${count} keys)${colors.reset}`
    );
  },
  error: (operation, key, error) => {
    console.error(
      `${colors.dim}${timestamp()}${colors.reset} ${colors.red}[cache]${colors.reset} ${colors.red}${operation} error${colors.reset} ${colors.dim}${key}${colors.reset}`,
      error
    );
  }
};
const backendCache = {
  async get(key) {
    try {
      const data = await redis.get(key);
      return data;
    } catch (error) {
      log.error("get", key, error);
      return null;
    }
  },
  async set(key, value, ttl = 3600) {
    try {
      await redis.setex(key, ttl, JSON.stringify(value));
      log.set(key);
    } catch (error) {
      log.error("set", key, error);
    }
  },
  async del(key) {
    try {
      await redis.del(key);
    } catch (error) {
      log.error("del", key, error);
    }
  },
  async invalidate(pattern) {
    try {
      const keys = await redis.keys(pattern);
      if (keys.length > 0) {
        await redis.del(...keys);
        log.invalidate(pattern, keys.length);
      }
    } catch (error) {
      log.error("invalidate", pattern, error);
    }
  },
  async exists(key) {
    try {
      return await redis.exists(key) === 1;
    } catch (error) {
      return false;
    }
  },
  async ttl(key) {
    try {
      return await redis.ttl(key);
    } catch (error) {
      return -1;
    }
  }
};
async function withBackendCache(key, fetcher, ttl = Duration.minutes(10)) {
  const startTime = Date.now();
  try {
    const cached = await backendCache.get(key);
    if (cached !== null && cached !== void 0) {
      const duration = Date.now() - startTime;
      log.hit(key, duration);
      return cached;
    }
    log.miss(key);
  } catch (error) {
    log.error("read", key, error);
  }
  const fetchStart = Date.now();
  const data = await fetcher();
  const fetchDuration = Date.now() - fetchStart;
  log.fetch(key, fetchDuration);
  backendCache.set(key, data, Duration.toMillis(ttl)).catch((err) => {
    log.error("write", key, err);
  });
  return data;
}

const DateTimeScalar = new GraphQLScalarType({
  name: "DateTime",
  serialize: (value) => value instanceof Date ? value.toISOString() : String(value),
  parseValue: (value) => new Date(value),
  parseLiteral: (ast) => ast.kind === Kind.STRING ? new Date(ast.value) : null
});
const apollo = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      me: async (_, __, { user }) => {
        if (!user) return null;
        return user;
      },
      // Wallets
      wallets: async (_, __, { user, db, session }) => {
        if (!user) throw new Error("Unauthorized");
        const orgId = session == null ? void 0 : session.activeOrganizationId;
        const key = orgId ? `wallets:org:${orgId}` : `wallets:user:${user.id}`;
        return withBackendCache(
          key,
          () => db.query.wallets.findMany({
            where: (w, { eq: eq2 }) => orgId ? eq2(w.organizationId, orgId) : eq2(w.userId, user.id),
            with: { transactions: true, financialGoals: true }
          })
        );
      },
      wallet: async (_, { id }, { user, db, session }) => {
        if (!user) throw new Error("Unauthorized");
        const orgId = session == null ? void 0 : session.activeOrganizationId;
        const key = orgId ? `wallet:${id}:org:${orgId}` : `wallet:${id}:user:${user.id}`;
        return withBackendCache(
          key,
          async () => {
            var _a;
            return (_a = await db.query.wallets.findFirst({
              where: (w, { eq: eq2, and: and2 }) => orgId ? and2(eq2(w.id, id), eq2(w.organizationId, orgId)) : and2(eq2(w.id, id), eq2(w.userId, user.id)),
              with: { transactions: true, financialGoals: true }
            })) != null ? _a : null;
          }
        );
      },
      // Categories
      categories: async (_, { type }, { user, db, session }) => {
        if (!user) throw new Error("Unauthorized");
        const orgId = session == null ? void 0 : session.activeOrganizationId;
        const key = orgId ? `categories:org:${orgId}` : `categories:user:${user.id}`;
        return withBackendCache(
          key,
          () => db.query.categories.findMany({
            where: (c, { eq: eq2, and: and2 }) => {
              const base = orgId ? eq2(c.organizationId, orgId) : eq2(c.userId, user.id);
              return type ? and2(base, eq2(c.type, type)) : base;
            }
          })
        );
      },
      category: async (_, { id }, { user, db, session }) => {
        if (!user) throw new Error("Unauthorized");
        const orgId = session == null ? void 0 : session.activeOrganizationId;
        const key = orgId ? `category:${id}:org:${orgId}` : `category:${id}:user:${user.id}`;
        return withBackendCache(
          key,
          async () => {
            var _a;
            return (_a = await db.query.categories.findFirst({
              where: (c, { eq: eq2, and: and2 }) => orgId ? and2(eq2(c.id, id), eq2(c.organizationId, orgId)) : and2(eq2(c.id, id), eq2(c.userId, user.id))
            })) != null ? _a : null;
          }
        );
      },
      // Transactions
      transactions: async (_, { walletId, categoryId, type, from, to, limit, offset }, { user, db, session }) => {
        if (!user) throw new Error("Unauthorized");
        const orgId = session == null ? void 0 : session.activeOrganizationId;
        const key = orgId ? `transactions:org:${orgId}` : `transactions:user:${user.id}`;
        return withBackendCache(
          key,
          () => db.query.transactions.findMany({
            where: (t, { eq: eq2, and: and2, gte, lte }) => {
              const conditions = orgId ? [eq2(t.organizationId, orgId)] : [eq2(t.userId, user.id)];
              if (walletId) conditions.push(eq2(t.walletId, walletId));
              if (categoryId) conditions.push(eq2(t.categoryId, categoryId));
              if (type) conditions.push(eq2(t.type, type));
              if (from) conditions.push(gte(t.date, new Date(from)));
              if (to) conditions.push(lte(t.date, new Date(to)));
              return and2(...conditions);
            },
            with: { wallet: true, toWallet: true, category: true },
            limit: limit != null ? limit : 50,
            offset: offset != null ? offset : 0,
            orderBy: (t, { desc }) => desc(t.date)
          })
        );
      },
      transaction: async (_, { id }, { user, db, session }) => {
        if (!user) throw new Error("Unauthorized");
        const orgId = session == null ? void 0 : session.activeOrganizationId;
        const key = orgId ? `transaction:${id}:org:${orgId}` : `transaction:${id}:user:${user.id}`;
        return withBackendCache(
          key,
          async () => {
            var _a;
            return (_a = await db.query.transactions.findFirst({
              where: (t, { eq: eq2, and: and2 }) => orgId ? and2(eq2(t.id, id), eq2(t.organizationId, orgId)) : and2(eq2(t.id, id), eq2(t.userId, user.id)),
              with: { wallet: true, toWallet: true, category: true }
            })) != null ? _a : null;
          }
        );
      },
      // Budgets
      budgets: async (_, __, { user, db, session }) => {
        if (!user) throw new Error("Unauthorized");
        const orgId = session == null ? void 0 : session.activeOrganizationId;
        const key = orgId ? `budgets:org:${orgId}` : `budgets:user:${user.id}`;
        return withBackendCache(
          key,
          () => db.query.budgets.findMany({
            where: (b, { eq: eq2 }) => orgId ? eq2(b.organizationId, orgId) : eq2(b.userId, user.id),
            with: { category: true }
          })
        );
      },
      budget: async (_, { id }, { user, db, session }) => {
        if (!user) throw new Error("Unauthorized");
        const orgId = session == null ? void 0 : session.activeOrganizationId;
        const key = orgId ? `budget:${id}:org:${orgId}` : `budget:${id}:user:${user.id}`;
        return withBackendCache(
          key,
          async () => {
            var _a;
            return (_a = await db.query.budgets.findFirst({
              where: (b, { eq: eq2, and: and2 }) => orgId ? and2(eq2(b.id, id), eq2(b.organizationId, orgId)) : and2(eq2(b.id, id), eq2(b.userId, user.id)),
              with: { category: true }
            })) != null ? _a : null;
          }
        );
      },
      // Recurring Transactions
      recurringTransactions: async (_, { isActive }, { user, db, session }) => {
        if (!user) throw new Error("Unauthorized");
        const orgId = session == null ? void 0 : session.activeOrganizationId;
        const key = orgId ? `recurring:org:${orgId}` : `recurring:user:${user.id}`;
        return withBackendCache(
          key,
          () => db.query.recurringTransactions.findMany({
            where: (r, { eq: eq2, and: and2 }) => {
              const base = orgId ? eq2(r.organizationId, orgId) : eq2(r.userId, user.id);
              return isActive !== void 0 ? and2(base, eq2(r.isActive, isActive)) : base;
            },
            with: { wallet: true, category: true }
          })
        );
      },
      recurringTransaction: async (_, { id }, { user, db, session }) => {
        if (!user) throw new Error("Unauthorized");
        const orgId = session == null ? void 0 : session.activeOrganizationId;
        const key = orgId ? `recurringTransaction:${id}:org:${orgId}` : `recurringTransaction:${id}:user:${user.id}`;
        return withBackendCache(
          key,
          async () => {
            var _a;
            return (_a = await db.query.recurringTransactions.findFirst({
              where: (r, { eq: eq2, and: and2 }) => orgId ? and2(eq2(r.id, id), eq2(r.organizationId, orgId)) : and2(eq2(r.id, id), eq2(r.userId, user.id)),
              with: { wallet: true, category: true }
            })) != null ? _a : null;
          }
        );
      },
      // Financial Goals
      financialGoals: async (_, __, { user, db, session }) => {
        if (!user) throw new Error("Unauthorized");
        const orgId = session == null ? void 0 : session.activeOrganizationId;
        const key = orgId ? `goals:org:${orgId}` : `goals:user:${user.id}`;
        return withBackendCache(
          key,
          () => db.query.financialGoals.findMany({
            where: (g, { eq: eq2 }) => orgId ? eq2(g.organizationId, orgId) : eq2(g.userId, user.id),
            with: { wallet: true }
          })
        );
      },
      financialGoal: async (_, { id }, { user, db, session }) => {
        if (!user) throw new Error("Unauthorized");
        const orgId = session == null ? void 0 : session.activeOrganizationId;
        const key = orgId ? `goal:${id}:org:${orgId}` : `goal:${id}:user:${user.id}`;
        return withBackendCache(
          key,
          async () => {
            var _a;
            return (_a = await db.query.financialGoals.findFirst({
              where: (g, { eq: eq2, and: and2 }) => orgId ? and2(eq2(g.id, id), eq2(g.organizationId, orgId)) : and2(eq2(g.id, id), eq2(g.userId, user.id)),
              with: { wallet: true }
            })) != null ? _a : null;
          }
        );
      },
      // Organization
      organizations: async (_, __, { user, db }) => {
        if (!user) throw new Error("Unauthorized");
        const members = await db.query.member.findMany({
          where: (m, { eq: eq2 }) => eq2(m.userId, user.id),
          with: { organization: true }
        });
        return members.map((m) => m.organization);
      },
      organization: async (_, { id }, { user, db }) => {
        var _a;
        if (!user) throw new Error("Unauthorized");
        const m = await db.query.member.findFirst({
          where: (m2, { eq: eq2, and: and2 }) => and2(eq2(m2.organizationId, id), eq2(m2.userId, user.id)),
          with: { organization: true }
        });
        return (_a = m == null ? void 0 : m.organization) != null ? _a : null;
      }
    },
    Mutation: {
      // Wallet
      createWallet: async (_, { input }, { user, db, session }) => {
        var _a, _b, _c;
        if (!user) throw new Error("Unauthorized");
        const orgId = session == null ? void 0 : session.activeOrganizationId;
        const result = await db.insert(wallets).values({
          ...input,
          userId: user.id,
          organizationId: (_a = orgId != null ? orgId : input.organizationId) != null ? _a : null,
          balance: (_b = input.balance) != null ? _b : 0,
          currency: (_c = input.currency) != null ? _c : "IDR"
        }).returning();
        await invalidateUserCache(user.id, orgId);
        return result[0];
      },
      updateWallet: async (_, { id, input }, { user, db, session }) => {
        if (!user) throw new Error("Unauthorized");
        const orgId = session == null ? void 0 : session.activeOrganizationId;
        const result = await db.update(wallets).set(input).where(
          orgId ? and(eq(wallets.id, id), eq(wallets.organizationId, orgId)) : and(eq(wallets.id, id), eq(wallets.userId, user.id))
        ).returning();
        if (!result[0]) throw new Error("Wallet not found");
        await invalidateUserCache(user.id, orgId);
        return result[0];
      },
      deleteWallet: async (_, { id }, { user, db, session }) => {
        if (!user) throw new Error("Unauthorized");
        const orgId = session == null ? void 0 : session.activeOrganizationId;
        await db.delete(wallets).where(
          orgId ? and(eq(wallets.id, id), eq(wallets.organizationId, orgId)) : and(eq(wallets.id, id), eq(wallets.userId, user.id))
        );
        await invalidateUserCache(user.id, orgId);
        return true;
      },
      // Category
      createCategory: async (_, { input }, { user, db, session }) => {
        var _a;
        if (!user) throw new Error("Unauthorized");
        const orgId = session == null ? void 0 : session.activeOrganizationId;
        const result = await db.insert(categories).values({
          ...input,
          userId: user.id,
          organizationId: (_a = orgId != null ? orgId : input.organizationId) != null ? _a : null
        }).returning();
        await invalidateUserCache(user.id, orgId);
        return result[0];
      },
      updateCategory: async (_, { id, input }, { user, db, session }) => {
        if (!user) throw new Error("Unauthorized");
        const orgId = session == null ? void 0 : session.activeOrganizationId;
        const result = await db.update(categories).set(input).where(
          orgId ? and(eq(categories.id, id), eq(categories.organizationId, orgId)) : and(eq(categories.id, id), eq(categories.userId, user.id))
        ).returning();
        if (!result[0]) throw new Error("Category not found");
        await invalidateUserCache(user.id, orgId);
        return result[0];
      },
      deleteCategory: async (_, { id }, { user, db, session }) => {
        if (!user) throw new Error("Unauthorized");
        const orgId = session == null ? void 0 : session.activeOrganizationId;
        await db.delete(categories).where(
          orgId ? and(eq(categories.id, id), eq(categories.organizationId, orgId)) : and(eq(categories.id, id), eq(categories.userId, user.id))
        );
        await invalidateUserCache(user.id, orgId);
        return true;
      },
      // Transaction
      createTransaction: async (_, { input }, { user, db, session }) => {
        var _a, _b, _c;
        if (!user) throw new Error("Unauthorized");
        const orgId = session == null ? void 0 : session.activeOrganizationId;
        const result = await db.insert(transactions).values({
          ...input,
          userId: user.id,
          organizationId: (_a = orgId != null ? orgId : input.organizationId) != null ? _a : null,
          date: new Date(input.date),
          currency: (_b = input.currency) != null ? _b : "IDR",
          exchangeRate: (_c = input.exchangeRate) != null ? _c : 1e6
        }).returning();
        await invalidateUserCache(user.id, orgId);
        return result[0];
      },
      updateTransaction: async (_, { id, input }, { user, db, session }) => {
        if (!user) throw new Error("Unauthorized");
        const orgId = session == null ? void 0 : session.activeOrganizationId;
        const result = await db.update(transactions).set({ ...input, date: input.date ? new Date(input.date) : void 0 }).where(
          orgId ? and(eq(transactions.id, id), eq(transactions.organizationId, orgId)) : and(eq(transactions.id, id), eq(transactions.userId, user.id))
        ).returning();
        if (!result[0]) throw new Error("Transaction not found");
        await invalidateUserCache(user.id, orgId);
        return result[0];
      },
      deleteTransaction: async (_, { id }, { user, db, session }) => {
        if (!user) throw new Error("Unauthorized");
        const orgId = session == null ? void 0 : session.activeOrganizationId;
        await db.delete(transactions).where(
          orgId ? and(eq(transactions.id, id), eq(transactions.organizationId, orgId)) : and(eq(transactions.id, id), eq(transactions.userId, user.id))
        );
        await invalidateUserCache(user.id, orgId);
        return true;
      },
      // Budget
      createBudget: async (_, { input }, { user, db, session }) => {
        var _a, _b;
        if (!user) throw new Error("Unauthorized");
        const orgId = session == null ? void 0 : session.activeOrganizationId;
        const result = await db.insert(budgets).values({
          ...input,
          userId: user.id,
          organizationId: (_a = orgId != null ? orgId : input.organizationId) != null ? _a : null,
          period: (_b = input.period) != null ? _b : "monthly"
        }).returning();
        await invalidateUserCache(user.id, orgId);
        return result[0];
      },
      updateBudget: async (_, { id, input }, { user, db, session }) => {
        if (!user) throw new Error("Unauthorized");
        const orgId = session == null ? void 0 : session.activeOrganizationId;
        const result = await db.update(budgets).set(input).where(
          orgId ? and(eq(budgets.id, id), eq(budgets.organizationId, orgId)) : and(eq(budgets.id, id), eq(budgets.userId, user.id))
        ).returning();
        if (!result[0]) throw new Error("Budget not found");
        await invalidateUserCache(user.id, orgId);
        return result[0];
      },
      deleteBudget: async (_, { id }, { user, db, session }) => {
        if (!user) throw new Error("Unauthorized");
        const orgId = session == null ? void 0 : session.activeOrganizationId;
        await db.delete(budgets).where(
          orgId ? and(eq(budgets.id, id), eq(budgets.organizationId, orgId)) : and(eq(budgets.id, id), eq(budgets.userId, user.id))
        );
        await invalidateUserCache(user.id, orgId);
        return true;
      },
      // Recurring Transaction
      createRecurringTransaction: async (_, { input }, { user, db, session }) => {
        var _a;
        if (!user) throw new Error("Unauthorized");
        const orgId = session == null ? void 0 : session.activeOrganizationId;
        const result = await db.insert(recurringTransactions).values({
          ...input,
          userId: user.id,
          organizationId: (_a = orgId != null ? orgId : input.organizationId) != null ? _a : null,
          startDate: new Date(input.startDate),
          nextRunDate: new Date(input.startDate)
        }).returning();
        await invalidateUserCache(user.id, orgId);
        return result[0];
      },
      updateRecurringTransaction: async (_, { id, input }, { user, db, session }) => {
        if (!user) throw new Error("Unauthorized");
        const orgId = session == null ? void 0 : session.activeOrganizationId;
        const result = await db.update(recurringTransactions).set(input).where(
          orgId ? and(eq(recurringTransactions.id, id), eq(recurringTransactions.organizationId, orgId)) : and(eq(recurringTransactions.id, id), eq(recurringTransactions.userId, user.id))
        ).returning();
        if (!result[0]) throw new Error("Recurring transaction not found");
        await invalidateUserCache(user.id, orgId);
        return result[0];
      },
      deleteRecurringTransaction: async (_, { id }, { user, db, session }) => {
        if (!user) throw new Error("Unauthorized");
        const orgId = session == null ? void 0 : session.activeOrganizationId;
        await db.delete(recurringTransactions).where(
          orgId ? and(eq(recurringTransactions.id, id), eq(recurringTransactions.organizationId, orgId)) : and(eq(recurringTransactions.id, id), eq(recurringTransactions.userId, user.id))
        );
        await invalidateUserCache(user.id, orgId);
        return true;
      },
      // Financial Goal
      createFinancialGoal: async (_, { input }, { user, db, session }) => {
        var _a;
        if (!user) throw new Error("Unauthorized");
        const orgId = session == null ? void 0 : session.activeOrganizationId;
        const result = await db.insert(financialGoals).values({
          ...input,
          userId: user.id,
          organizationId: (_a = orgId != null ? orgId : input.organizationId) != null ? _a : null,
          deadline: input.deadline ? new Date(input.deadline) : void 0
        }).returning();
        await invalidateUserCache(user.id, orgId);
        return result[0];
      },
      updateFinancialGoal: async (_, { id, input }, { user, db, session }) => {
        if (!user) throw new Error("Unauthorized");
        const orgId = session == null ? void 0 : session.activeOrganizationId;
        const result = await db.update(financialGoals).set({ ...input, deadline: input.deadline ? new Date(input.deadline) : void 0 }).where(
          orgId ? and(eq(financialGoals.id, id), eq(financialGoals.organizationId, orgId)) : and(eq(financialGoals.id, id), eq(financialGoals.userId, user.id))
        ).returning();
        if (!result[0]) throw new Error("Financial goal not found");
        await invalidateUserCache(user.id, orgId);
        return result[0];
      },
      deleteFinancialGoal: async (_, { id }, { user, db, session }) => {
        if (!user) throw new Error("Unauthorized");
        const orgId = session == null ? void 0 : session.activeOrganizationId;
        await db.delete(financialGoals).where(
          orgId ? and(eq(financialGoals.id, id), eq(financialGoals.organizationId, orgId)) : and(eq(financialGoals.id, id), eq(financialGoals.userId, user.id))
        );
        await invalidateUserCache(user.id, orgId);
        return true;
      }
    },
    DateTime: DateTimeScalar
  }
});
const graphql = startServerAndCreateH3Handler(apollo, {
  context: ({ event }) => createContext(event)
});

export { graphql as default };
//# sourceMappingURL=graphql.mjs.map
