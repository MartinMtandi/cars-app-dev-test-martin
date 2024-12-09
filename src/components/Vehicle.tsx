'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { PhoneIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid';
import { getVehicleById } from '../services/vehicleService';
import ContactForm from './ContactForm';
import { getDealerById } from '@/services/dealerService';

interface VehicleData {
  type: string;
  id: string;
  attributes: {
    make: string;
    model: string;
    variant: string;
    year: number;
    price: number;
    mileage: string;
    fuel_type: string;
    transmission: string;
    colour: string;
    image: {
      version: number;
      count: number;
      path: string;
      name: string;
      extension: string;
    };
    description: string;
    title: string;
    agent_name: string;
    agent_coords_0_coord: number;
    agent_coords_1_coord: number;
    whatsapp_enabled?: boolean;
    agent_contact: string;
  };
  relationships: {
    seller: {
      data: {
        type: string;
        id: string;
      };
    };
  };
}

interface DealerData {
  id: string;
  name: string;
  phone: string;
  email: string;
}

export default function Vehicle() {
  const [vehicle, setVehicle] = useState<VehicleData | null>(null);
  const [dealer, setDealer] = useState<DealerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPhone, setShowPhone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getVehicleById('7927016');
        console.log('Raw Vehicle Data:', JSON.stringify(response, null, 2));
        
        if (!response?.cache?.data?.[0]) {
          throw new Error('Invalid vehicle data structure');
        }

        const vehicleData = response.cache.data[0];
        console.log('Processed Vehicle Data:', JSON.stringify(vehicleData, null, 2));
        
        setVehicle(vehicleData);
        setError(null);

        // Only fetch dealer data if we have a seller ID
        if (vehicleData?.relationships?.seller?.data?.id) {
          try {
            const dealerData = await getDealerById(vehicleData.relationships.seller.data.id);
            console.log('Dealer Data:', JSON.stringify(dealerData, null, 2));
            setDealer(dealerData);
          } catch (dealerError) {
            console.error('Error fetching dealer:', dealerError);
          }
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load vehicle data';
        setError(errorMessage);
        setVehicle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <VehicleContainer>
        <LoadingContainer>Loading...</LoadingContainer>
      </VehicleContainer>
    );
  }

  if (error) {
    return (
      <VehicleContainer>
        <ErrorContainer>{error}</ErrorContainer>
      </VehicleContainer>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const imageUrl = `https://img-ik.cars.co.za/ik-seo/carsimages/tr:n-stock_large/${vehicle?.id}/${vehicle?.attributes?.title}.jpg?v=${vehicle?.attributes?.image?.version}`;

  const handlePhoneClick = () => {
    setShowPhone(true);
  };

  const handleWhatsAppClick = () => {
    if (vehicle?.attributes?.agent_contact) {
      const message = `Hi, I'm interested in your ${vehicle.attributes.title} listed on Cars.co.za`;
      const whatsappUrl = `https://wa.me/${vehicle.attributes.agent_contact}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <MainContainer>
      <VehicleContainer>
        <VehicleCard>
          {vehicle && (
            <>
              <ImageContainer>
                <Image
                  src={imageUrl}
                  alt={vehicle.attributes.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </ImageContainer>
              <VehicleDetails>
                <Title>{vehicle.attributes.title}</Title>
                <Price>{formatPrice(vehicle.attributes.price)}</Price>
                <DetailsGrid>
                  <DetailItem>
                    <h3>Mileage</h3>
                    <p>{vehicle.attributes.mileage}</p>
                  </DetailItem>
                  <DetailItem>
                    <h3>Fuel Type</h3>
                    <p>{vehicle.attributes.fuel_type}</p>
                  </DetailItem>
                  <DetailItem>
                    <h3>Transmission</h3>
                    <p>{vehicle.attributes.transmission}</p>
                  </DetailItem>
                  <DetailItem>
                    <h3>Colour</h3>
                    <p>{vehicle.attributes.colour}</p>
                  </DetailItem>
                </DetailsGrid>

                <DealerSection>
                  <DealerName>{vehicle.attributes.agent_name}</DealerName>
                  <ContactButtons>
                    <PhoneButton
                      onClick={handlePhoneClick}
                      disabled={showPhone}
                    >
                      <PhoneIcon width={20} height={20} />
                      {showPhone ? vehicle.attributes.agent_contact : 'Show Phone Number'}
                    </PhoneButton>
                    {vehicle.attributes.whatsapp_enabled && (
                      <WhatsAppButton onClick={handleWhatsAppClick}>
                        <ChatBubbleLeftIcon width={20} height={20} />
                        WhatsApp
                      </WhatsAppButton>
                    )}
                  </ContactButtons>
                </DealerSection>

                {vehicle.attributes.description && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>Description</h3>
                    <p style={{ whiteSpace: 'pre-line' }}>
                      {vehicle.attributes.description}
                    </p>
                  </div>
                )}
              </VehicleDetails>
            </>
          )}
        </VehicleCard>
      </VehicleContainer>
      {vehicle && (
        <ContactForm 
          dealerName={dealer?.name || vehicle.attributes.agent_name || ''} 
          dealerPhone={dealer?.phone || vehicle.attributes.agent_contact || ''} 
          dealerEmail={dealer?.email || ''} 
          vehicleTitle={vehicle.attributes.title || ''} 
        />
      )}
    </MainContainer>
  );
}

const MainContainer = styled.main`
  max-width: 1200px;
  margin: 2rem auto;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  padding: 0 1rem;
`;

const VehicleContainer = styled.div`
  width: 100%;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #ce181e;
  font-size: 1.125rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #666;
  font-size: 1.125rem;
`;

const VehicleCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  background: #f5f5f5;
`;

const VehicleDetails = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #ce181e;
  margin-bottom: 2rem;
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

const DetailItem = styled.div`
  h3 {
    font-size: 0.875rem;
    color: #666;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 1.125rem;
    color: #333;
    font-weight: 500;
  }
`;

const DealerSection = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

const DealerName = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
`;

const ContactButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PhoneButton = styled(Button)`
  background: #ce181e;
  color: white;
  border: none;

  &:hover:not(:disabled) {
    background: #b01418;
  }
`;

const WhatsAppButton = styled(Button)`
  background: #25d366;
  color: white;
  border: none;

  &:hover:not(:disabled) {
    background: #1fb959;
  }
`;
