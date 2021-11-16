import * as React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  UserIcon,
  MenuAlt2Icon,
  XIcon,
  ClockIcon,
  CalendarIcon,
  CogIcon,
  CollectionIcon
} from '@heroicons/react/outline';

type SideNavigationItem = {
  name: string;
  href: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

const SideNavigation = () => {
  const navigation = [
    { name: 'Events', href: '/events', icon: CollectionIcon },
    { name: 'Bookings', href: '/bookings', icon: CalendarIcon },
    { name: 'Availability', href: '/availability', icon: ClockIcon },
    { name: 'Settings', href: '/settings', icon: CogIcon }
  ].filter(Boolean) as SideNavigationItem[];

  return (
    <>
      {navigation.map((item) => (
        <Link key={item.name} href={item.href}>
          <a
            className={clsx(
              'text-gray-800 hover:bg-white hover:bg-gray-50',
              'group flex items-center px-2 py-2 text-base font-medium rounded-md'
            )}
          >
            <item.icon
              className={clsx(
                'text-gray-400 group-hover:text-gray-600',
                'mr-4 flex-shrink-0 h-6 w-6'
              )}
              aria-hidden="true"
            />
            {item.name}
          </a>
        </Link>
      ))}
      {/* <UserDropdown /> */}
    </>
  );
};

type UserNavigationItem = {
  name: string;
  to: string;
  onClick?: () => void;
};

const UserNavigation = () => {
  const userNavigation = [
    { name: 'Your Profile', to: './profile' },
    {
      name: 'Sign out',
      to: ''
      // onClick: () => {
      //   logout();
      // },
    }
  ].filter(Boolean) as UserNavigationItem[];

  return (
    <Menu as="div" className="ml-3 relative">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="max-w-xs  bg-gray-200 p-2 flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="sr-only">Open user menu</span>
              <UserIcon className="h-8 w-8 rounded-full" />
            </Menu.Button>
          </div>
          <Transition
            show={open}
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            {/* <Menu.Items
              static
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {userNavigation.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <Link
                      onClick={item.onClick}
                      to={item.to}
                      className={clsx(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700",
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items> */}
          </Transition>
        </>
      )}
    </Menu>
  );
};

type MobileSidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileSidebar = ({ sidebarOpen, setSidebarOpen }: MobileSidebarProps) => {
  return (
    <Transition.Root show={sidebarOpen} as={React.Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 flex z-40 md:hidden"
        open={sidebarOpen}
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={React.Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-white bg-opacity-75" />
        </Transition.Child>
        <Transition.Child
          as={React.Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
            <Transition.Child
              as={React.Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>
            {/* <div className="flex-shrink-0 flex items-center px-4">
              <Logo />
            </div> */}
            <div className="mt-5 flex-1 h-0 overflow-y-auto">
              <nav className="px-2 space-y-1">
                <SideNavigation />
              </nav>
            </div>
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
      </Dialog>
    </Transition.Root>
  );
};

const Sidebar = () => {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-56">
        <div className="flex flex-col h-0 flex-1 border-r border-gray-200">
          {/* <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
            <Logo />
          </div> */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <nav className="flex-1 px-2 py-4 bg-white space-y-1">
                <SideNavigation />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      <MobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <Sidebar />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div>
          <button
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  );
};
