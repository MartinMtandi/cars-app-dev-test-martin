'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { HeartIcon, MagnifyingGlassIcon, ClockIcon } from '@heroicons/react/24/outline';
import styled from 'styled-components';
import Image from 'next/image';
import navigationData from '../utils/navigationItems.json';

const Navigation = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Return null on server-side and first render
  }

  return (
    <NavBar>
      <NavContainer>
        <NavContent>
          <LogoContainer>
            <LogoLink href="/">
              <svg width="121" height="42" viewBox="0 0 395 116" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path d="M86.21 82.67c-1.27.98-26.8 27.14-56.98 23.26-30.18-3.89-10.12-38.01-1.97-48.32 8.15-10.32 42.73-47.57 73.46-49.09 0 0 23.27-1.96.86 23.52l-8.45 7.54s1.06 3.3 4.68.94c3.62-2.36 30.03-20.39 11.48-35.47-13.15-10.71-41.37-.83-60.87 10.92 0 0-.2.13-.58.34-5.4 3.31-10.11 6.74-13.61 9.91C21.25 36.97 3.59 55.63.46 79.36c-.27 1.71-.42 3.42-.44 5.13v.04c-.07 6.7 1.95 13.29 7.1 19.31 2.1 2.42 13.23 13.96 32.25 10.94 1.41-.26 2.9-.57 4.42-.95.18-.05.36-.08.53-.13 12.48-3.19 28.6-10.95 43.63-29.24 0 0-.46-2.77-1.73-1.79M260.58 88.72c-3.95 0-6.69 2.82-6.69 6.93 0 4.11 2.74 6.84 6.55 6.84 4.09 0 6.76-2.89 6.76-6.84-.07-4.18-2.76-6.93-6.62-6.93ZM333.37 88.72c-3.96 0-6.7 2.82-6.7 6.93 0 4.11 2.75 6.84 6.54 6.84 4.11 0 6.78-2.89 6.78-6.84-.07-4.18-2.74-6.93-6.62-6.93ZM287.25 80.08c2.19 0 3.66.39 4.63.83l1.3-6.17c-1.75-.65-4.15-1.02-6.32-1.02-9.92 0-15.29 6.37-15.29 14.18 0 8.34 5.51 13.63 14.14 13.63 3.17 0 5.95-.55 7.42-1.26l-.99-6.1c-1.24.54-2.77.88-4.73.88-4.04 0-7.32-2.63-7.32-7.47-.05-4.36 2.8-7.48 7.15-7.48M309.6 95.63c-3.54 0-5.44-3.44-5.44-8.02 0-3.92 1.52-8.02 5.44-8.02 3.92 0 5.29 4.04 5.29 7.98 0 4.85-2.01 8.07-5.29 8.07m.28-21.99c-8.62 0-14.29 5.52-14.29 14.18s6 13.75 13.8 13.75c7.14 0 14.07-4.47 14.07-14.24 0-8.06-5.46-13.69-13.58-13.69ZM354.93 94.26c1.52-1.46 2.89-3.16 4.36-4.85l8.03-10.09V74.3h-21.83v6.61h11.67v.11c-1.48 1.57-2.67 2.95-4.21 4.68l-8.39 10.52v4.74h23.17v-6.59h-12.82v-.12l.02.01ZM386.45 91.26c0 .5-.05.99-.17 1.43-.54 1.69-2.29 3.05-4.3 3.05-1.85 0-3.27-1.04-3.27-3.16 0-3.16 3.37-4.19 7.74-4.19v2.88-.01Zm8.01 3.28v-9.33c0-6.33-2.78-11.56-11.66-11.56-4.86 0-8.52 1.37-10.37 2.4l1.53 5.35c1.75-1.09 4.63-2.02 7.37-2.02 4.08 0 4.85 2.02 4.85 3.5v.33c-9.43 0-15.65 3.27-15.65 10.19 0 4.26 3.22 8.18 8.62 8.18 3.17 0 5.9-1.14 7.65-3.27h.15l.49 2.67h7.46c-.31-1.46-.43-3.92-.43-6.43M195.08 58.04s.67-.31 1.95-.78c.36-.14.95-.35 1.79-.59 2.53-.77 6.32-1.63 11.13-2.01.81-1.69 3.5-8.52-7.39-7.49-.35 0-.69.02-1.06.05-4.81.47-10.86 3.45-11.74 3.9-2.49 1.28-5.01 2.82-6.43 4.41 1.48-2.01 4.62-7.09-.3-8.26-6.18-1.47-5.62-1.16-6.31.55-.09.24-.51 1.1-1.21 2.41L151.48 90.4c.57 1.97 9.33 19.28 13.57 7.91 4.78-12.57 10.39-26.01 13.06-29.91 1.9-2.76 10.27-7.59 16.99-10.36h-.02ZM124.67 82.13c-5.25 5.13-10.59 9.08-14.94 9.76-12.73 2.02-4.71-12.65-4.71-12.65 2.77-5.62 6.7-9.97 11.05-13.34 0 0 13.05-12.06 30.3-11.47 0 0 .25 6.85-21.7 27.7Zm17.14 5.55c-.05-.96.06-2.43.7-4.53.14-.33.14-.59.31-.97 1.64-4.69 5.73-12.05 15.4-23.07l3.78-3.92s2.2-2.89-.85-5.18l-2.62-2.26s-2.48-1.5-6.5 1.12l-1 .55s-8.2-6.88-25.74 1.21c0 0-.09.04-.28.11-.77.37-1.57.76-2.39 1.19 0 0-.69.28-1.78.97-1.35.75-2.73 1.59-4.18 2.52-4.82 3.04-10.8 7.44-15.61 12.97-2.21 2.26-4.26 4.65-5.94 7.14-.83 1.23-1.58 2.5-2.21 3.76 0 0-5.23 10.4-.8 17.08 1.24 1.96 3.31 3.55 6.54 4.49 1.49.6 3.34.93 5.58.9.28-.01.55-.02.82-.04h.17c12.5-.62 22.82-9.73 25.59-12.38 0 0 .32 4.04 2.97 7.58.31.45.67.86 1.03 1.23 2.2 2.28 5.59 4.08 10.81 3.98 3.63-3.7.69-10.64-.18-12.47-1.42.02-3.12-.32-3.62-1.97M246.08 57.4c6.29-.5 11.49-.39 11.08-2.7-.42-2.32-1.63-7.78-7.02-9.4-4.49-1.34-19.41 3.45-28.65 7.45 0 0-1.05.42-2.6 1.17-.22.1-.43.2-.63.3 0 0-.03.01-.03.02-.26.12-.5.25-.74.38-3.31 1.7-5.67 3.4-7.39 4.96-1.24 1.12-2.34 2.34-3.13 3.64-2.12 3.24-2.07 5.86-1.56 7.58.17.69.49 1.39 1.01 2.06.13.19.22.3.22.3 1.97 2.27 6.34 4.2 15.63 4.17 8.04 0 13.22.55 16.49 1.24.9.22 2.45.72 3.08 1.72 1.34 2.11-1.84 4.22-1.93 4.26v.02c-2.27 1.65-8.78 5.74-20.96 8.38-6.41 1.48-12.65 2.11-17.56 2.2h-.05c-4.55.08-7.93-.3-9.14-.9-3.91-1.94 1.77-5.99 5.45-7.44 3.68-1.44 9.41-4.13 9.41-4.13-3.66-1.4-22.93 2.13-22.94 7.94-.03 5.8 5.79 9.88 5.79 9.88 16.87 7.03 38.74-.55 44.47-2.84 3.82-1.52 12.88-6.88 15.38-12.74 2.93-5.94-.89-9.52-5.83-11.66-3.29-1.41-7.06-2.17-10.69-2.55-.23 0-.53-.03-.92-.08-1.46-.14-2.89-.22-4.25-.23-3.18-.01-6.83.18-8.5.29-.3.03-.58.04-.84.05h-.06c-.93.03-1.55-.07-1.95-.18h-.06c-.08-.02-.15-.05-.23-.08-.23-.09-.31-.15-.31-.15-.92-.49-1.54-1.4-.02-3.08 5.73-6.34 24.36-9.39 29.99-9.84" fill="#fff"></path></svg>
            </LogoLink>
          </LogoContainer>
          <NavLinks>
            {navigationData.navItems.map((item) => (
              <NavItem key={item.href}>
                {item.dropdownItems ? (
                  <>
                    <NavLink href={item.href} $isSelected={pathname === item.href}>
                      {item.name}
                      <ChevronDownIcon />
                    </NavLink>
                    {item.name === 'News & Reviews' ? (
                      <Dropdown $isWide>
                        <DropdownGrid>
                          <DropdownLinks>
                            {item.dropdownItems.map((dropdownItem) => (
                              <DropdownLink
                                key={dropdownItem.href}
                                href={dropdownItem.href}
                              >
                                {dropdownItem.name}
                              </DropdownLink>
                            ))}
                          </DropdownLinks>
                          <FeaturedCar>
                            <CarImage>
                              <Image
                                src="https://img-ik.cars.co.za/ik-seo/carsimages/tr:n-stock_large/9874811/2019-BMW-M5-Auto.jpg?v=3694940395"
                                alt="2024 BMW M5"
                                fill
                              />
                            </CarImage>
                            <CarTitle>2024 BMW M5 Touring Teased</CarTitle>
                            <CarDescription>
                              BMW has released the first official images of its upcoming M5 Touring, showing the high-performance wagon testing in winter conditions.
                            </CarDescription>
                            <ViewButton href="/news-reviews/motoring/bmw-m5-touring-2024">
                              Car News
                            </ViewButton>
                          </FeaturedCar>
                          <FeaturedCar>
                            <CarImage>
                              <Image
                                src="https://img-ik.cars.co.za/ik-seo/carsimages/tr:n-stock_large/9906932_3/2024-Mercedes-Benz-GLE-300d-4Matic.jpg?v=3252161502"
                                alt="2024 Mercedes-AMG GT 63"
                                fill
                              />
                            </CarImage>
                            <CarTitle>Mercedes-AMG GT 63 Review</CarTitle>
                            <CarDescription>
                              The new Mercedes-AMG GT 63 combines luxury and performance in a stunning package. Read our full review of this 585-hp grand tourer.
                            </CarDescription>
                            <ViewButton href="/news-reviews/reviews/mercedes-amg-gt-63-2024">
                              Cars.co.za Reports
                            </ViewButton>
                          </FeaturedCar>
                        </DropdownGrid>
                      </Dropdown>
                    ) : item.name === 'Profile' ? (
                      <Dropdown>
                        {item.dropdownItems.map((dropdownItem) => (
                          <DropdownLink
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                          >
                            {dropdownItem.name.includes('Wishlist') && <HeartIcon />}
                            {dropdownItem.name.includes('Saved Searches') && <MagnifyingGlassIcon />}
                            {dropdownItem.name.includes('Recently Viewed') && <ClockIcon />}
                            {dropdownItem.name}
                          </DropdownLink>
                        ))}
                      </Dropdown>
                    ) : (
                      <Dropdown>
                        {item.dropdownItems.map((dropdownItem) => (
                          <DropdownLink
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                          >
                            {dropdownItem.name}
                          </DropdownLink>
                        ))}
                      </Dropdown>
                    )}
                  </>
                ) : (
                  <NavLink href={item.href} $isSelected={pathname === item.href}>
                    {item.name}
                  </NavLink>
                )}
              </NavItem>
            ))}
          </NavLinks>

          <MobileMenuButton>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </MobileMenuButton>
        </NavContent>
      </NavContainer>
    </NavBar>
  );
};

const NavBar = styled.nav`
  background: #CE181E;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 50;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.div`
  position: relative;
`;

const NavLink = styled(Link)<{ $isSelected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem;
  color: ${props => props.$isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.9)'};
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  border-radius: 0.375rem;
  font-size: 0.9375rem;

  &:hover {
    color: white;
    background-color: rgba(255, 255, 255, 0.1);
  }

  svg:not(.no-rotate) {
    width: 1rem;
    height: 1rem;
    transition: transform 0.2s ease;
  }

  &:hover svg:not(.no-rotate) {
    transform: rotate(180deg);
  }
`;

interface DropdownProps {
  $isWide?: boolean;
}

const Dropdown = styled.div<DropdownProps>`
  position: absolute;
  top: 100%;
  left: ${({ $isWide }) => $isWide ? '-400px' : '0'};
  width: ${({ $isWide }) => $isWide ? '800px' : '16rem'};
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s ease;
  border: 1px solid #f3f4f6;
  padding: ${({ $isWide }) => $isWide ? '1rem' : '0.5rem'};
  z-index: 50;

  ${NavItem}:hover & {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

const DropdownGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem;
`;

const DropdownLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const FeaturedCar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CarImage = styled.div`
  position: relative;
  width: 100%;
  height: 140px;
  border-radius: 0.5rem;
  overflow: hidden;
  
  img {
    object-fit: cover;
  }
`;

const CarTitle = styled.h3`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--gray-900);
`;

const CarDescription = styled.p`
  font-size: 0.8rem;
  color: var(--gray-600);
  line-height: 1.4;
`;

const ViewButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background-color: var(--primary);
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--primary-hover);
  }
`;

const DropdownLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1rem;
  color: #4b5563;
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
    color: var(--primary);
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  padding: 0.5rem;
  color: white;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 0.375rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    display: block;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export default Navigation;
