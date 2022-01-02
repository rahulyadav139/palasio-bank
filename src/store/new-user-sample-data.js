import { randomNumberGenerator } from './helper-functions';

const sampleData = {
  authDetails: {
    username: '',
    password: '',
  },
  personalDetails: {
    name: '',
    address: 'Ram Nagar',
    email: '',
  },
  bankAccountDetails: {
    accountNumber: randomNumberGenerator(12),
    accountBalance: 0,
    accountType: 'Saving Account',
    ifsc: `PLSO${randomNumberGenerator(6)}`,
    branch: 'Metro Tower, Palasia Indore, MP',
    nominee: '-',
  },
  debitCardDetails: {
    cardType: 'Premium Debit Card',
    cardNumber: randomNumberGenerator(16),
    validity: '12/30',
    cvv: randomNumberGenerator(3),
    cardPin: '',
    POSLimit: '500000',
    withdrawalLimit: '100000',
    tapAndPayLimit: '5000',
    POSAccess: 'enabled',
  },
  creditCardDetails: {
    cardNumber: randomNumberGenerator(16),
    validity: '12/30',
    cvv: randomNumberGenerator(3),
    cardPin: '',
    POSLimit: '500000',
    withdrawalLimit: '100000',
    tapAndPayLimit: '5000',
    POSAccess: 'enabled',
  },
  loanAccountDetails: [],
  depositDetails: [],
  movements: [],
};

export default sampleData;
