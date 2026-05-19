import gql from 'graphql-tag'

// =====================================================================
// TRANSACTIONS
// =====================================================================
export const GET_TRANSACTIONS = gql`
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
`

export const GET_TRANSACTION = gql`
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
`

export const CREATE_TRANSACTION = gql`
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
`

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($id: ID!, $input: UpdateTransactionInput!) {
    updateTransaction(id: $id, input: $input) {
      id
      amount
      type
      description
      date
    }
  }
`

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: ID!) {
    deleteTransaction(id: $id)
  }
`

// =====================================================================
// WALLETS
// =====================================================================
export const GET_WALLETS = gql`
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
`

export const GET_WALLET = gql`
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
`

export const CREATE_WALLET = gql`
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
`

export const UPDATE_WALLET = gql`
  mutation UpdateWallet($id: ID!, $input: UpdateWalletInput!) {
    updateWallet(id: $id, input: $input) {
      id
      name
      type
      balance
      currency
    }
  }
`

export const DELETE_WALLET = gql`
  mutation DeleteWallet($id: ID!) {
    deleteWallet(id: $id)
  }
`

// =====================================================================
// CATEGORIES
// =====================================================================
export const GET_CATEGORIES = gql`
  query GetCategories($type: String) {
    categories(type: $type) {
      id
      name
      icon
      type
      createdAt
    }
  }
`

export const GET_CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      id
      name
      icon
      type
      createdAt
    }
  }
`

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      name
      icon
      type
      createdAt
    }
  }
`

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $input: UpdateCategoryInput!) {
    updateCategory(id: $id, input: $input) {
      id
      name
      icon
      type
    }
  }
`

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`

// =====================================================================
// BUDGETS
// =====================================================================
export const GET_BUDGETS = gql`
  query GetBudgets {
    budgets {
      id
      amount
      period
      createdAt
      category { id name icon type }
    }
  }
`

export const GET_BUDGET = gql`
  query GetBudget($id: ID!) {
    budget(id: $id) {
      id
      amount
      period
      createdAt
      category { id name icon type }
    }
  }
`

export const CREATE_BUDGET = gql`
  mutation CreateBudget($input: CreateBudgetInput!) {
    createBudget(input: $input) {
      id
      amount
      period
      createdAt
    }
  }
`

export const UPDATE_BUDGET = gql`
  mutation UpdateBudget($id: ID!, $input: UpdateBudgetInput!) {
    updateBudget(id: $id, input: $input) {
      id
      amount
      period
    }
  }
`

export const DELETE_BUDGET = gql`
  mutation DeleteBudget($id: ID!) {
    deleteBudget(id: $id)
  }
`

// =====================================================================
// RECURRING TRANSACTIONS
// =====================================================================
export const GET_RECURRING_TRANSACTIONS = gql`
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
`

export const GET_RECURRING_TRANSACTION = gql`
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
`

export const CREATE_RECURRING_TRANSACTION = gql`
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
`

export const UPDATE_RECURRING_TRANSACTION = gql`
  mutation UpdateRecurringTransaction($id: ID!, $input: UpdateRecurringTransactionInput!) {
    updateRecurringTransaction(id: $id, input: $input) {
      id
      amount
      frequency
      isActive
    }
  }
`

export const DELETE_RECURRING_TRANSACTION = gql`
  mutation DeleteRecurringTransaction($id: ID!) {
    deleteRecurringTransaction(id: $id)
  }
`

// =====================================================================
// FINANCIAL GOALS
// =====================================================================
export const GET_FINANCIAL_GOALS = gql`
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
`

export const GET_FINANCIAL_GOAL = gql`
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
`

export const CREATE_FINANCIAL_GOAL = gql`
  mutation CreateFinancialGoal($input: CreateFinancialGoalInput!) {
    createFinancialGoal(input: $input) {
      id
      name
      targetAmount
      currentAmount
      deadline
    }
  }
`

export const UPDATE_FINANCIAL_GOAL = gql`
  mutation UpdateFinancialGoal($id: ID!, $input: UpdateFinancialGoalInput!) {
    updateFinancialGoal(id: $id, input: $input) {
      id
      name
      targetAmount
      currentAmount
      deadline
    }
  }
`

export const DELETE_FINANCIAL_GOAL = gql`
  mutation DeleteFinancialGoal($id: ID!) {
    deleteFinancialGoal(id: $id)
  }
`

// =====================================================================
// ORGANIZATIONS
// =====================================================================
export const GET_ORGANIZATIONS = gql`
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
`

export const GET_ORGANIZATION = gql`
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
`

export const CREATE_ORGANIZATION = gql`
  mutation CreateOrganization($input: CreateOrganizationInput!) {
    createOrganization(input: $input) {
      id
      name
      slug
      logo
      createdAt
    }
  }
`

export const INVITE_MEMBER = gql`
  mutation InviteMember($organizationId: ID!, $email: String!, $role: String) {
    inviteMember(organizationId: $organizationId, email: $email, role: $role) {
      id
      email
      role
      status
      expiresAt
    }
  }
`

export const REMOVE_MEMBER = gql`
  mutation RemoveMember($memberId: ID!) {
    removeMember(memberId: $memberId)
  }
`

// =====================================================================
// ME
// =====================================================================
export const GET_ME = gql`
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
`
