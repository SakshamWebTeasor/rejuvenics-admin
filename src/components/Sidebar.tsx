import { useState, useEffect } from "react";
import Image from "next/image";
import { RxDashboard } from "react-icons/rx";
import Button from "react-bootstrap/Button";
import { FiUsers } from "react-icons/fi";
import { TfiPackage } from "react-icons/tfi";
import {
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineGlobal,
  AiOutlineSlack,
} from "react-icons/ai";
import { SiCircle } from "react-icons/si";
import { MdNavigateNext } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { logout } from "@/lib/helper";
import { useRouter } from "next/router";

export default function Sidebar() {

  const router = useRouter()
  const [showDropdown, setShowDropDown] = useState({
    catalog: false,
    international: false,
    Orders: false
  });

  let isAdmin = localStorage.getItem('isAdmin') == "true"
  console.log('isAdmin:', isAdmin)

  const dropdownHandler = (type: string, value: boolean) =>
    setShowDropDown({ ...showDropdown, [type]: value });

  return (
    <>
      <div className="sidebar-page">
        <Image
          src="/logo-dark.svg"
          role="presentation"
          width={100}
          height={50}
          alt={"logo"}
        />
        <ul>
          <li>
            <Link href="/dashboard">
              <span>
                <RxDashboard />
              </span>
              Dashboard
            </Link>
          </li>
          {isAdmin && <li>
            <a
              href="#"
              onClick={() => dropdownHandler("catalog", !showDropdown.catalog)}
            >
              <span>
                <AiOutlineSlack />
              </span>
              Catalog
              <span
                className={
                  showDropdown.catalog ? "arrow-rotated" : "arrow-next"
                }
              >
                <MdNavigateNext />
              </span>
            </a>
            {showDropdown.catalog && (
              <div className="submenu">
                <ul>
                  <li>
                    <Link href="/product">Products</Link>
                  </li>
                  <li>
                    <Link href="/category">Categories</Link>
                  </li>
                  <li>
                    <Link href="/attributes">Attributes</Link>
                  </li>
                  <li>
                    <Link href="/coupon">Coupons</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>}
          {isAdmin && <li>
            <Link href="/customer">
              <span>
                <FiUsers />
              </span>
              Customers
            </Link>
          </li>}
          <li>
            <Link href="/order">
              <span>
                <TfiPackage />
              </span>
              {isAdmin ? "Orders" : "My Orders"}
            </Link>
            <span
              className={
                showDropdown.Orders ? "arrow-rotated" : "arrow-next"
              }
            >
              <a
                href="#"
                onClick={() => dropdownHandler("Orders", !showDropdown.Orders)}
              >
                <MdNavigateNext />
              </a>
            </span>
            {showDropdown.Orders && (
              <div className="submenu">
                <ul>
                  <li>
                    <a href="#" onClick={() => {
                      router.push({
                        pathname: '/order',
                        search: "1"
                      })
                    }}>Processing Orders</a>
                  </li>
                  <li>
                    <a href="#" onClick={() => {
                      router.push({
                        pathname: '/order',
                        search: "2"
                      })
                    }}>Intransit Orders</a>
                  </li>
                  <li>
                    <a href="#" onClick={() => {
                      router.push({
                        pathname: '/order',
                        search: "3"
                      })
                    }}>Delivered Orders</a>
                  </li>
                  <li>
                    <a href="#" onClick={() => {
                      router.push({
                        pathname: '/order',
                        search: "4"
                      })
                    }}>Cancelled Orders</a>
                  </li>
                </ul>
              </div>
            )}
          </li>
          {isAdmin && <li>
            <a href="#">
              <span>
                <AiOutlineUser />
              </span>
              Our Staff
            </a>
          </li>}
          {isAdmin && <li>
            <a href="#">
              <span>
                <AiOutlineSetting />
              </span>
              Settings
            </a>
          </li>}
          {false && <li>
            <a
              href="#"
              onClick={() =>
                dropdownHandler("international", !showDropdown.international)
              }
            >
              <span>
                <AiOutlineGlobal />
              </span>
              International
              <span
                className={
                  showDropdown.international ? "arrow-rotated" : "arrow-next"
                }
              >
                <MdNavigateNext />
              </span>
            </a>
            {showDropdown.international && (
              <div className="submenu">
                <ul>
                  <li>
                    <a href="#">Languages</a>
                  </li>
                  <li>
                    <a href="#">Currencies</a>
                  </li>
                </ul>
              </div>
            )}
          </li>}
          <li>
            <a href="#">
              <span>
                <SiCircle />
              </span>
              Online Store
            </a>
          </li>
        </ul>
        <div className="btn-logout">
          <Button variant="success" onClick={
            () => {
              signOut();
              logout();
            }
          }>
            <span>
              <MdLogout />
              &#10240;
            </span>
            Log Out
          </Button>
        </div>
      </div>
    </>
  );
}
