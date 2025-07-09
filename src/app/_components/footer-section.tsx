import Image from 'next/image'

const FooterSection = () => (
  <footer className='w-full bg-[#111] text-neutral-200 pt-12 pb-6 px-4 md:px-0'>
    <div className='max-w-7xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-12 md:gap-16'>
      {/* Brand and description */}
      <div className='flex-1 min-w-[320px] max-w-[420px] flex flex-col gap-4'>
        <div className='flex items-center gap-4 mb-2'>
          <Image
            src='/assets/prodsight-logo-lg.svg'
            alt='Adazolhub Logo'
            width={48}
            height={48}
          />
          <span className='text-3xl font-bold tracking-tight'>
            Adazolhub <span className='font-light'>| ProdSight</span>
          </span>
        </div>
        <p className='text-lg leading-relaxed text-neutral-300'>
          ProdSight helps anyone with an idea turn it into a real product—faster
          and with less stress. Whether you&apos;re a developer, designer, or
          just getting started, our AI tools guide you every step of the way.
        </p>
      </div>
      {/* Links */}
      <div className='flex-[2] grid grid-cols-1 md:grid-cols-3 gap-8 w-full'>
        <div>
          <h4 className='font-bold text-lg mb-3 text-white'>About Us</h4>
          <ul className='space-y-2'>
            <li>
              <a href='#' className='hover:underline'>
                Our Mission
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline'>
                The Problem
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline'>
                Our Solution
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline'>
                Comparison
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className='font-bold text-lg mb-3 text-white'>Resources</h4>
          <ul className='space-y-2'>
            <li>
              <a href='#' className='hover:underline'>
                Dashboard
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline'>
                Features
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline'>
                Pricing
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline'>
                FAQ
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className='font-bold text-lg mb-3 text-white'>Legal</h4>
          <ul className='space-y-2'>
            <li>
              <a href='#' className='hover:underline'>
                Privacy Policy
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline'>
                Terms of Service
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline'>
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    {/* Bottom copyright */}
    <div className='mt-12 text-center'>
      <div className='font-bold tracking-widest text-white mb-1'>ADAZOLHUB</div>
      <div className='text-sm text-neutral-400'>
        Copyright 2025 | All Rights Reserved.
      </div>
    </div>
  </footer>
)

export default FooterSection
