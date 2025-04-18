import type React from 'react';
import { Link } from 'react-router-dom';

interface FooterLinkProps {
  href: string;
  text: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, text }) => (
  <li className="mb-2">
    <a href={href} className="text-sm text-gray-300 hover:text-white">
      {text}
    </a>
  </li>
);

const FooterColumn = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h3 className="mb-4 font-medium text-white">{title}</h3>
    <ul className="space-y-1">
      {children}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <FooterColumn title="Recruiter services">
            <FooterLink href="#" text="Job Posting" />
            <FooterLink href="#" text="Resume Database (Resdex)" />
            <FooterLink href="#" text="Branding Solutions" />
            <FooterLink href="#" text="Employer Branding" />
            <FooterLink href="#" text="Talent Pool" />
          </FooterColumn>

          <FooterColumn title="Information">
            <FooterLink href="#" text="About us" />
            <FooterLink href="#" text="Clients" />
            <FooterLink href="#" text="Careers" />
            <FooterLink href="#" text="Partner with us" />
            <FooterLink href="#" text="Terms & Conditions" />
            <FooterLink href="#" text="Privacy policy" />
            <FooterLink href="#" text="Disclaimer" />
            <FooterLink href="#" text="FAQs" />
          </FooterColumn>

          <FooterColumn title="Legal">
            <FooterLink href="#" text="Job Posting" />
            <FooterLink href="#" text="Summons and Notice" />
            <FooterLink href="#" text="Third-party liability" />
            <FooterLink href="#" text="Whitelist" />
          </FooterColumn>

          <FooterColumn title="Customer support">
            <p className="mb-2 text-sm text-gray-300">
              Toll Free: 1800-102-5558
            </p>
            <p className="mb-2 text-sm text-gray-300">
              (Mon - Sat: 9am - 6pm)
            </p>
            <FooterLink href="mailto:support@naukri.com" text="support@naukri.com" />
          </FooterColumn>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="mb-4 flex items-center">
            <Link to="/" className="mb-4">
              <img
                src="https://ext.same-assets.com/1229505073/3499267156.png"
                alt="Naukri Logo"
                className="h-8"
              />
            </Link>
          </div>
          <p className="text-xs text-gray-500">
            © 2023 Info Edge (India) Limited | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
