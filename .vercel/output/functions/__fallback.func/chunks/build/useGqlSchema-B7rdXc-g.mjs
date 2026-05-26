import gql from 'graphql-tag';

const GET_TRANSACTIONS = gql`
  query GetTransactions(
    $walletId: ID
    $categoryId: ID
    $type: TransactionType
    $from: DateTime
    $to: DateTime
    $limit: Int
    $offset: Int
  ) {
    transactions(
      walletId: $walletId
      categoryId: $categoryId
      type: $type
      from: $from
      to: $to
      limit: $limit
      offset: $offset
    ) {
      id
      amount
      type
      description
      currency
      date
      createdAt
      wallet { id name type currency }
      toWallet { id name type currency }
      category { id name icon type }
    }
  }
`;
gql`
  query GetTransaction($id: ID!) {
    transaction(id: $id) {
      id
      amount
      type
      description
      currency
      date
      createdAt
      wallet { id name type currency }
      toWallet { id name type currency }
      category { id name icon type }
    }
  }
`;
const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($input: CreateTransactionInput!) {
    createTransaction(input: $input) {
      id
      amount
      type
      description
      currency
      date
      createdAt
    }
  }
`;
const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($id: ID!, $input: UpdateTransactionInput!) {
    updateTransaction(id: $id, input: $input) {
      id
      amount
      type
      description
      date
    }
  }
`;
const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: ID!) {
    deleteTransaction(id: $id)
  }
`;
const GET_WALLETS = gql`
  query GetWallets {
    wallets {
      id
      name
      type
      balance
      currency
      createdAt
    }
  }
`;
gql`
  query GetWallet($id: ID!) {
    wallet(id: $id) {
      id
      name
      type
      balance
      currency
      createdAt
      transactions {
        id
        amount
        type
        description
        date
      }
      financialGoals {
        id
        name
        targetAmount
        currentAmount
        deadline
      }
    }
  }
`;
const CREATE_WALLET = gql`
  mutation CreateWallet($input: CreateWalletInput!) {
    createWallet(input: $input) {
      id
      name
      type
      balance
      currency
      createdAt
    }
  }
`;
const UPDATE_WALLET = gql`
  mutation UpdateWallet($id: ID!, $input: UpdateWalletInput!) {
    updateWallet(id: $id, input: $input) {
      id
      name
      type
      balance
      currency
    }
  }
`;
const DELETE_WALLET = gql`
  mutation DeleteWallet($id: ID!) {
    deleteWallet(id: $id)
  }
`;
const GET_CATEGORIES = gql`
  query GetCategories($type: String) {
    categories(type: $type) {
      id
      name
      icon
      type
      createdAt
    }
  }
`;
gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      id
      name
      icon
      type
      createdAt
    }
  }
`;
const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      name
      icon
      type
      createdAt
    }
  }
`;
const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $input: UpdateCategoryInput!) {
    updateCategory(id: $id, input: $input) {
      id
      name
      icon
      type
    }
  }
`;
const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`;
const GET_BUDGETS = gql`
  query GetBudgets {
    budgets {
      id
      amount
      period
      createdAt
      category { id name icon type }
    }
  }
`;
gql`
  query GetBudget($id: ID!) {
    budget(id: $id) {
      id
      amount
      period
      createdAt
      category { id name icon type }
    }
  }
`;
const CREATE_BUDGET = gql`
  mutation CreateBudget($input: CreateBudgetInput!) {
    createBudget(input: $input) {
      id
      amount
      period
      createdAt
    }
  }
`;
const UPDATE_BUDGET = gql`
  mutation UpdateBudget($id: ID!, $input: UpdateBudgetInput!) {
    updateBudget(id: $id, input: $input) {
      id
      amount
      period
    }
  }
`;
const DELETE_BUDGET = gql`
  mutation DeleteBudget($id: ID!) {
    deleteBudget(id: $id)
  }
`;
const GET_RECURRING_TRANSACTIONS = gql`
  query GetRecurringTransactions($isActive: Boolean) {
    recurringTransactions(isActive: $isActive) {
      id
      amount
      type
      description
      frequency
      startDate
      nextRunDate
      lastRunDate
      isActive
      createdAt
      wallet { id name type currency }
      category { id name icon type }
    }
  }
`;
gql`
  query GetRecurringTransaction($id: ID!) {
    recurringTransaction(id: $id) {
      id
      amount
      type
      description
      frequency
      startDate
      nextRunDate
      lastRunDate
      isActive
      createdAt
      wallet { id name type currency }
      category { id name icon type }
    }
  }
`;
const CREATE_RECURRING_TRANSACTION = gql`
  mutation CreateRecurringTransaction($input: CreateRecurringTransactionInput!) {
    createRecurringTransaction(input: $input) {
      id
      amount
      type
      frequency
      startDate
      nextRunDate
      isActive
    }
  }
`;
gql`
  mutation UpdateRecurringTransaction($id: ID!, $input: UpdateRecurringTransactionInput!) {
    updateRecurringTransaction(id: $id, input: $input) {
      id
      amount
      frequency
      isActive
    }
  }
`;
const DELETE_RECURRING_TRANSACTION = gql`
  mutation DeleteRecurringTransaction($id: ID!) {
    deleteRecurringTransaction(id: $id)
  }
`;
const GET_FINANCIAL_GOALS = gql`
  query GetFinancialGoals {
    financialGoals {
      id
      name
      targetAmount
      currentAmount
      deadline
      createdAt
      wallet { id name type currency }
    }
  }
`;
gql`
  query GetFinancialGoal($id: ID!) {
    financialGoal(id: $id) {
      id
      name
      targetAmount
      currentAmount
      deadline
      createdAt
      wallet { id name type currency }
    }
  }
`;
const CREATE_FINANCIAL_GOAL = gql`
  mutation CreateFinancialGoal($input: CreateFinancialGoalInput!) {
    createFinancialGoal(input: $input) {
      id
      name
      targetAmount
      currentAmount
      deadline
    }
  }
`;
const UPDATE_FINANCIAL_GOAL = gql`
  mutation UpdateFinancialGoal($id: ID!, $input: UpdateFinancialGoalInput!) {
    updateFinancialGoal(id: $id, input: $input) {
      id
      name
      targetAmount
      currentAmount
      deadline
    }
  }
`;
const DELETE_FINANCIAL_GOAL = gql`
  mutation DeleteFinancialGoal($id: ID!) {
    deleteFinancialGoal(id: $id)
  }
`;
gql`
  query GetOrganizations {
    organizations {
      id
      name
      slug
      logo
      createdAt
      members {
        id
        role
        user { id name email image }
      }
    }
  }
`;
gql`
  query GetOrganization($id: ID!) {
    organization(id: $id) {
      id
      name
      slug
      logo
      createdAt
      members {
        id
        role
        user { id name email image }
      }
      invitations {
        id
        email
        role
        status
        expiresAt
      }
    }
  }
`;
gql`
  mutation CreateOrganization($input: CreateOrganizationInput!) {
    createOrganization(input: $input) {
      id
      name
      slug
      logo
      createdAt
    }
  }
`;
gql`
  mutation InviteMember($organizationId: ID!, $email: String!, $role: String) {
    inviteMember(organizationId: $organizationId, email: $email, role: $role) {
      id
      email
      role
      status
      expiresAt
    }
  }
`;
gql`
  mutation RemoveMember($memberId: ID!) {
    removeMember(memberId: $memberId)
  }
`;
gql`
  query Me {
    me {
      id
      name
      email
      username
      displayUsername
      image
    }
  }
`;

export { CREATE_BUDGET as C, DELETE_BUDGET as D, GET_BUDGETS as G, UPDATE_BUDGET as U, CREATE_CATEGORY as a, CREATE_FINANCIAL_GOAL as b, CREATE_RECURRING_TRANSACTION as c, CREATE_TRANSACTION as d, CREATE_WALLET as e, DELETE_CATEGORY as f, DELETE_FINANCIAL_GOAL as g, DELETE_RECURRING_TRANSACTION as h, DELETE_TRANSACTION as i, DELETE_WALLET as j, GET_CATEGORIES as k, GET_FINANCIAL_GOALS as l, GET_RECURRING_TRANSACTIONS as m, GET_TRANSACTIONS as n, GET_WALLETS as o, UPDATE_CATEGORY as p, UPDATE_FINANCIAL_GOAL as q, UPDATE_TRANSACTION as r, UPDATE_WALLET as s };
//# sourceMappingURL=useGqlSchema-B7rdXc-g.mjs.map
