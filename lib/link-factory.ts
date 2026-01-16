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

const termsAndConditionsLinks = {
  all: () => ["terms-and-conditions"],
};

const privacyPolicyLinks = {
  all: () => ["privacy-policy"],
};

export const linkFactory = {
  authLinks,
  dashboardLinks,
  static: {
    termsAndConditionsLinks,
    privacyPolicyLinks,
  },
};
