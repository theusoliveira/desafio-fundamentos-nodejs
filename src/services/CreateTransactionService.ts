import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type === 'outcome') {
      const { total } = this.transactionsRepository.getBalance();

      if (total < value) {
        throw Error(
          `Insufficient funds. Don't have money enough to complete this transaction.`,
        );
      }
    }
    return this.transactionsRepository.create({ title, value, type });
  }
}

export default CreateTransactionService;
