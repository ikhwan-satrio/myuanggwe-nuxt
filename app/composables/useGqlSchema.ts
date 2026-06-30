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
      exchangeRate
      fromAmount
      afterTransaction
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
      exchangeRate
      fromAmount
      afterTransaction
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
      exchangeRate
      fromAmount
      afterTransaction
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
      currency
      exchangeRate
      fromAmount
      afterTransaction
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
      wallet { id name currency }
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
      wallet { id name currency }
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

// =====================================================================
// AUTH
// =====================================================================
export const SIGN_UP = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      user { id name email username image emailVerified role createdAt updatedAt }
      session { id expiresAt token createdAt updatedAt ipAddress userAgent userId activeOrganizationId }
      token
    }
  }
`

export const SIGN_IN = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      user { id name email username image emailVerified role createdAt updatedAt }
      session { id expiresAt token createdAt updatedAt ipAddress userAgent userId activeOrganizationId }
      token
    }
  }
`

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`

// =====================================================================
// USER
// =====================================================================
export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      name
      email
      username
      displayUsername
      image
      role
    }
  }
`

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(currentPassword: $currentPassword, newPassword: $newPassword)
  }
`

// =====================================================================
// ORGANIZATION - EXTRA
// =====================================================================
export const GET_ORGANIZATION_BY_SLUG = gql`
  query GetOrganizationBySlug($slug: String!) {
    organizationBySlug(slug: $slug) {
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

export const GET_MEMBERS = gql`
  query GetMembers($organizationId: ID!) {
    members(organizationId: $organizationId) {
      id
      role
      createdAt
      user { id name email image }
    }
  }
`

export const GET_INVITATIONS = gql`
  query GetInvitations {
    invitations {
      id
      email
      role
      status
      expiresAt
      createdAt
      organization { id name slug logo }
      inviter { id name email image }
    }
  }
`

export const UPDATE_ORGANIZATION = gql`
  mutation UpdateOrganization($id: ID!, $input: UpdateOrganizationInput!) {
    updateOrganization(id: $id, input: $input) {
      id
      name
      slug
      logo
      createdAt
    }
  }
`

export const DELETE_ORGANIZATION = gql`
  mutation DeleteOrganization($id: ID!) {
    deleteOrganization(id: $id)
  }
`

export const UPDATE_MEMBER_ROLE = gql`
  mutation UpdateMemberRole($memberId: ID!, $role: String!) {
    updateMemberRole(memberId: $memberId, role: $role) {
      id
      role
      user { id name email image }
    }
  }
`

export const ACCEPT_INVITATION = gql`
  mutation AcceptInvitation($invitationId: ID!) {
    acceptInvitation(invitationId: $invitationId)
  }
`

export const REJECT_INVITATION = gql`
  mutation RejectInvitation($invitationId: ID!) {
    rejectInvitation(invitationId: $invitationId)
  }
`

export const CANCEL_INVITATION = gql`
  mutation CancelInvitation($invitationId: ID!) {
    cancelInvitation(invitationId: $invitationId)
  }
`
