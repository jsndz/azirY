import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-wazirx-yellow">
              About
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-wazirx-blue">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-wazirx-blue">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-wazirx-blue">
                  Press
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-wazirx-yellow">
              Products
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-wazirx-blue">
                  Exchange
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-wazirx-blue">
                  WazirX Token
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-wazirx-blue">
                  WRX Staking
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-wazirx-yellow">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-wazirx-blue">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-wazirx-blue">
                  Fees
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-wazirx-blue">
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-wazirx-yellow">
              Community
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-wazirx-blue">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-wazirx-blue">
                  Telegram
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-wazirx-blue">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            &copy; 2023 WazirX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
