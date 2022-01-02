import styles from './Dashboard.module.css';
import SectionLeft from './SectionLeft';
import MainSection from './MainSection';
import SectionRight from './SectionRight';
import { Routes, Route } from 'react-router-dom';
import FinancialJourney from '../Services/FinancialJourney';
import EnquiryForm from '../Services/EnquiryForm';
import GenerateCardPIN from '../Services/GenerateCardPIN';
import ChangeAddress from '../Services/ChangeAddress';
import UpgradeAccount from '../Services/UpgradeAccount';
import UpdateNominee from '../Services/UpdateNominee';
import UpgradeDebitCard from '../Services/UpgradeDebitCard';
import UpgradeCreditCard from '../Services/UpgradeCreditCard';
import LinkLoanAccount from '../Services/LinkLoanAccount';
import AccountDetails from '../Services/AccountDetails';
import TransferPage from '../Services/TransferPage';
import CardAndLoans from '../Services/CardAndLoans';
import InvestmentAndInsurance from '../Services/InvestmentAndInsurance';
import CustomerService from '../Services/CustomerService';
import MyInvestment from '../Services/MyInvestment';
import MyLoans from '../Services/MyLoans';

import ManageLimits from '../Services/ManageLimits';
import BillPayment from '../Services/BillPayment';
import Transfer from '../Services/Transfer';
import OpenFixedDeposits from '../Services/OpenFixedDeposits';
import PaymentCards from '../Services/PaymentCards';
import Statement from '../Services/Statement';
import ChangePassword from '../Services/ChangePassword';
import FixedDeposits from '../Services/FixedDeposits';
import Payment from '../Services/Payment';

import { useSelector } from 'react-redux';
import ConfirmModal from '../../Modals/ConfirmModal';
import Card from '../../UI/Card';
const Dashboard = props => {
  const modal = useSelector(state => state.modal);
  return (
    <div className={styles.dashboard}>
      <SectionLeft />
      <Routes>
        <Route path="overview" element={<MainSection />} />
        <Route path="financial-journey" element={<FinancialJourney />} />
        <Route
          path="financial-journey/products/:productId"
          element={<EnquiryForm />}
        />
        <Route path="services/change-address" element={<ChangeAddress />} />
        <Route path="services/generate-pin" element={<GenerateCardPIN />} />
        <Route
          path="services/credit-card-upgrade"
          element={<UpgradeCreditCard />}
        />
        <Route
          path="services/account-upgrade"
          exact
          element={<UpgradeAccount />}
        />
        <Route path="services/update-nominee" element={<UpdateNominee />} />
        <Route
          path="services/debit-card-upgrade"
          element={<UpgradeDebitCard />}
        />
        <Route
          path="services/link-loan-account"
          element={<LinkLoanAccount />}
        />
        <Route path="services/change-password" element={<ChangePassword />} />
        <Route path="bank-accounts" element={<AccountDetails />} />
        <Route path="payments-and-transfer" element={<TransferPage />} />
        <Route path="card-and-loans" element={<CardAndLoans />} />
        <Route path="payment" element={<Payment />} />
        <Route
          path="investment-and-insurance"
          element={<InvestmentAndInsurance />}
        />
        <Route path="customer-service" element={<CustomerService />} />
        <Route path="my-loans" element={<MyLoans />} />
        <Route path="my-investment" element={<MyInvestment />} />

        <Route path="manage-limits" element={<ManageLimits />} />
        <Route path="bill-payment/:billType" element={<BillPayment />} />
        <Route path="fund-transfer/:paymentMethod" element={<Transfer />} />
        <Route path="fixed-deposits" element={<FixedDeposits />} />
        <Route
          path="payment-cards"
          element={
            <Card>
              <PaymentCards />
            </Card>
          }
        />

        <Route path="bill-payment/:billType" element={<BillPayment />} />
        <Route path="bill-payment/:billType" element={<BillPayment />} />
        <Route path="bill-payment/:billType" element={<BillPayment />} />
        <Route path="bill-payment/:billType" element={<BillPayment />} />

        <Route path="statement" element={<Statement />} />
        <Route path="open-fixed-deposits" element={<OpenFixedDeposits />} />
      </Routes>

      <SectionRight />
      {modal.isModal && <ConfirmModal />}
    </div>
  );
};
export default Dashboard;
