import React, { useState } from "react";

import Link from "next/link";
import { useModal } from "../../../hooks/useModal";
import { useAuthContext } from "../../../providers/useAuthContext";
import { LoginModal } from "../../login-modal";
import { NavigationModal } from "../../navigation-modal";
import { Button } from "../../button";
import { Avatar } from "../../avatar/avatar";
import { PopUp } from "./popup";

import MenuIcon from "../../../assets/icons/menu.svg";

const textStyle = "font-semibold text-base text-gray-700 cursor-pointer";

export const Navigation: React.FC = () => {
  const [isShown, setIsShown] = useState(false);
  const { logout, avatar, userId, name, isAuthenticated } = useAuthContext();
  const {
    isOpen: loginIsOpen,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useModal();
  const {
    isOpen: navIsOpen,
    onOpen: onOpenNav,
    onClose: onCloseNav,
  } = useModal();

  return (
    <>
      <LoginModal isOpen={loginIsOpen} onRequestClose={onCloseLogin} />
      <NavigationModal
        isOpen={navIsOpen}
        onRequestClose={onCloseNav}
        isAuth={isAuthenticated}
      />

      <div className="flex items-center w-full px-4 md:py-4 h-14 md:px-10 md:h-20">
        <div className="flex justify-between w-full mx-auto">
          <div className="flex items-center mr-5 space-x-8 align-middle">
            <Link href="/">
              <span className="text-lg font-bold text-orange-400 md:text-3xl whitespace-nowrap">
                Cloud Circle
              </span>
            </Link>

            <Link href="/">
              <span
                className={`${textStyle} align-middle hidden md:inline whitespace-nowrap`}
                role="button"
              >
                ルームを探す
              </span>
            </Link>

            {isAuthenticated && (
              <Link href="/received-applications">
                <span
                  className={`${textStyle} align-middle hidden md:inline whitespace-nowrap`}
                  role="button"
                >
                  受け取った申請
                </span>
              </Link>
            )}

            {isAuthenticated && (
              <Link href="/chat">
                <span
                  className={`${textStyle} hidden md:inline whitespace-nowrap`}
                  role="button"
                >
                  チャット
                </span>
              </Link>
            )}
          </div>

          <div className="flex items-center">
            {isAuthenticated ? (
              <Link href="/create-room">
                <Button
                  variant="outline"
                  size="small"
                  className="hidden mr-10 font-medium align-middle rounded-full md:inline"
                >
                  ルームを作成
                </Button>
              </Link>
            ) : (
              <Button
                variant="outline"
                size="small"
                className="hidden mr-10 font-medium align-middle rounded-full md:inline"
                onClick={onOpenLogin}
              >
                ルームを作成
              </Button>
            )}

            <div className="items-center hidden overflow-hidden md:flex">
              {isAuthenticated ? (
                <Avatar
                  src={avatar}
                  name={name}
                  className="align-middle cursor-pointer hover:opacity-80"
                  onClick={() => setIsShown(!isShown)}
                />
              ) : (
                <Button colorScheme="blue" onClick={onOpenLogin}>
                  Login
                </Button>
              )}
              {isShown && <PopUp logout={logout} userId={userId} name={name} />}
            </div>

            {isAuthenticated ? (
              <Button
                isIcon
                variant="ghost"
                className="md:hidden"
                onClick={onOpenNav}
              >
                <MenuIcon />
              </Button>
            ) : (
              <Button
                isIcon
                variant="ghost"
                className="md:hidden"
                onClick={onOpenNav}
              >
                <MenuIcon />
              </Button>
            )}
          </div>

          {/* <div className="flex items-center">
          <LogoutIcon class="w-5 h-5 fill-current mr-3" />
          <span className={textStyle} onClick={logout} role="button">
            ログアウト
          </span>
        </div> */}
        </div>
      </div>
    </>
  );
};
