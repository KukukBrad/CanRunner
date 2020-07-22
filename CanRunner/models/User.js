class User {
  constructor(
    fullName,
    phoneNumber,
    email,
    password,
    address,
    apt_suite,
    city,
    state,
    zipCode,
    DOB,
    SSN,
    startDate,
    carMake,
    carModel,
    carYear,
    carMilage,
    insuranceProvider,
    insurancePolicyNumber,
    e_Name,
    e_PhoneNumber,
    e_Relation,
    bank_NameOnAccount,
    bank_NameOfBank,
    bank_RoutingNumber,
    bank_AccountNumber,
    assignedRoute
  ) {
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.password = password;
    this.address = address;
    this.apt_suite = apt_suite;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
    this.DOB = DOB;
    this.SSN = SSN;
    this.startDate = startDate;
    this.carMake = carMake;
    this.carYear = carYear;
    this.carModel = carModel;
    this.carMilage = carMilage;
    this.insuranceProvider = insuranceProvider;
    this.insurancePolicyNumber = insurancePolicyNumber;
    this.e_Name = e_Relation;
    this.e_PhoneNumber = e_PhoneNumber;
    this.e_Relation = e_Relation;
    this.bank_NameOnAccount = bank_NameOnAccount;
    this.bank_NameOfBank = bank_NameOfBank;
    this.bank_RoutingNumber = bank_RoutingNumber;
    this.bank_AccountNumber = bank_AccountNumber;
    this.assignedRoute = assignedRoute;
  }


  destroySSN()
  {
      this.SSN = null;
  }

  changePassword(newPassword)
  {
      this.password = newPassword;
  }

  chagePhoneNumber(newPhoneNumber)
  {
      this.phoneNumber = newPhoneNumber;
  }
}

export default User;
