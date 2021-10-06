const mongoose = require("mongoose");

const PersonalCompanyDetailsSchema = mongoose.Schema({
  RegisterdLastName: String,
  RegisterdBirthDate: Date,
  RegisterdEmailAdress: String,
  RegisterdHetpayPartnershipOrganization: String,
  RegisterdFirstName: String,
  RegisterdId: String,
  RegisterdPhoneNumber: String,
  RegisterdCompanyName: String,
});

const BankAccountsArraySchema = mongoose.Schema({
  BankName: String,
  BankBranchNumber: String,
  BankAccountNumber: String,
});

const BankAccountsIndexSchema = mongoose.Schema({
  CompanyHoldingPercentage: String,
  BankAccountsArray: [BankAccountsArraySchema],
});

const LoanAmountAndYearsModelSchema = mongoose.Schema({
  LoanAmount: {
    type: Number,
    required: true,
  },
  LoanYears: {
    type: Number,
  },
});

const UserDataPassedFromClientSchema = mongoose.Schema({
  VerifiedUsername: String,
  VerifiedUserPersonalCompanyDetails: PersonalCompanyDetailsSchema,
  VerifiedUserBankAccountIndex: BankAccountsIndexSchema,
  VerifiedUserLoanAmount: LoanAmountAndYearsModelSchema,
});

module.exports = mongoose.model(
  "verified-user-data-object",
  UserDataPassedFromClientSchema
);
