const authLinks = {
  all: () => ["auth"],
  login: {
    all: () => [...authLinks.all(), "login"],
  },
  forgotPassword: {
    all: () => [...authLinks.all(), "forgot-password"],
  },
};

const dashboardLinks = {
  all: () => ["dashboard"],
  bookings: {
    all: () => [...dashboardLinks.all(), "bookings"],
    details: ({ id }: { id: string }) => [
      ...dashboardLinks.bookings.all(),
      id,
      "details",
    ],
  },
  drivers: {
    all: () => [...dashboardLinks.all(), "drivers"],
  },
  pricings: {
    all: () => [...dashboardLinks.all(), "pricings"],
  },
};

const privacyPolicyLinks = {
  all: () => ["privacy-policy"],
};

const resetPasswordLinks = {
  // all: () => [...authLinks.all(), "resetpassword"], // Not a page yet
  withToken: ({ token }: { token: string }) => ["resetpassword", token],
};

const termsAndConditionsLinks = {
  all: () => ["terms-and-conditions"],
};

export const linkFactory = {
  authLinks,
  resetPasswordLinks,
  dashboardLinks,
  static: {
    termsAndConditionsLinks,
    privacyPolicyLinks,
  },
};
