import { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useUserContextStore } from "@/store/authStore";

const navigation = [
  { name: "Dashboard", href: "/views/dashboard" },
  {
    name: "Self-Assessment",
    href: "/views/dashboard/self_assessment",
  },
  { name: "BackOffice", href: "/views/backoffice" },
  { name: "Departments Unit", href: "/views/backoffice/unit" },
  { name: "Users", href: "/views/backoffice/users" },
  {
    name: "Self-Assessment Maintenance",
    href: "/views/backoffice/create_self_assessment",
  },
  { name: "Reviews", href: "/views/self_assessment_review" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

interface HeaderProps {
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ currentPage }) => {
  const { currentUser } = useUserContextStore();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser?.USR_Role === "admin") {
      setIsAdmin(true);
    }
  }, [currentUser]);

  const filteredNavigation = isAdmin
    ? navigation
    : [navigation[0], navigation[1]];

  return (
    <Disclosure as="nav" className="text-white">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-between">
                <div className="flex flex-shrink-0 sm:flex-col items-center">
                  <div className="sm:text-4xl text-3xl font-bold text-color print-only sm-me-0 me-2">
                    ISC
                  </div>
                  <div className="text-xs text-color print-only">
                    Internal System Control
                  </div>
                </div>
                <div className="hidden sm:ml-6 lg:block ">
                  <div className="flex space-x-4">
                    {filteredNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          currentPage === item.href
                            ? "bg-violet-700 text-white"
                            : "text-white hover:bg-white hover:text-violet-700",
                          "rounded-xl px-3 py-1 text-sm font-medium"
                        )}
                        aria-current={
                          currentPage === item.href ? "page" : undefined
                        }
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center lg:hidden">
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon
                      className="block h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  ) : (
                    <Bars3Icon
                      className="block h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {filteredNavigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    currentPage === item.href
                      ? "bg-violet-700 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium text-center"
                  )}
                  aria-current={currentPage === item.href ? "page" : undefined}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
