import Link from 'next/link'
import Image from 'next/image'
import { FaTelegramPlane, FaTwitter, FaDiscord, FaInstagram, FaTiktok } from 'react-icons/fa';

import { Container } from '@/components/Container'

import logoImage from '@/images/logo.png'

export function Footer() {
  return (
    <footer className="bg-slate-50">
      <Container>
        <div className="py-16">
          <Image
            className="mx-auto h-10 w-auto"
            src={logoImage}
            alt=""
            width={56}
            height={56}
          />
        </div>
        <div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
          <div className="flex gap-x-6">
            <Link
              href="https://t.me/DegenXportal"
              target="_blank"
              className="group"
            >
              <FaTelegramPlane className="w-6 h-6 text-gray-500" />
            </Link>
            <Link
              href="https://twitter.com/degenecosystem"
              target="_blank"
              className="group"
            >
              <FaTwitter className="w-6 h-6 text-gray-500" />
            </Link>
            <Link
              href="https://discord.gg/BMaVtEVkgC"
              target="_blank"
              className="group"
            >
              <FaDiscord className="w-6 h-6 text-gray-500" />
            </Link>
            <Link
              href="https://instagram.com/degenecosystem"
              target="_blank"
              className="group"
            >
              <FaInstagram className="w-6 h-6 text-gray-500" />
            </Link>
            <Link
              href="https://www.tiktok.com/@degen_traders"
              target="_blank"
              className="group"
            >
              <FaTiktok className="w-6 h-6 text-gray-500" />
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-500 sm:mt-0">
            Copyright 🥦 {new Date().getFullYear()} DegenX. All rights
            reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
