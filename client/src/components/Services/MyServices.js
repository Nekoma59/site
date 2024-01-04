import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Import Global Styles
import {
  PaddingContainer,
  FlexContainer,
  Heading,
  IconContainer,
  GreenText,
  ParaText,
  Button,
} from '../../styles/Global.styled';

// Import My services styles
import { ServicesCardContainer, ServicesCard } from '../../styles/MyServices.styled';


import {
  fadeInLeftVariant,
  fadeInRightVariant,
} from '../../utils/Variants';

const Myservices = ({ IsInLogin }) => {
  const [services, setservices] = useState([]);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false); // État pour la boîte de dialogue
  const [ServiceIdToDelete, setServiceIdToDelete] = useState(null); // État pour stocker l'ID de la compétence à supprimer
  const [previewNewServiceIconUrl, setPreviewNewServiceIconUrl] = useState(''); // État pour afficher l'URL de l'icône en prévisualisation
  const [previewEditingServiceIconUrl, setPreviewEditingServiceIconUrl] = useState(''); // État pour afficher l'URL de l'icône en édition en prévisualisation

  useEffect(() => {
    // Fonction pour charger les compétences depuis le backend
    const fetchservices = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/getservices');
        if (response.ok) {
          const data = await response.json();
          setservices(data);
        } else {
          console.error('Réponse HTTP non OK :', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des compétences :', error.message);
      }
    };
    fetchservices();
  }, []);

  const [newService, setNewService] = useState({
    service: '',
    icon: '',
  });

  // Fonction pour ajouter une compétence
  const handleServiceAdd = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/insertservices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newService),
      });

      if (response.ok) {
        const addedService = await response.json();
        setservices((prevservices) => [...prevservices, addedService]);
        setNewService({
          service: '',
          icon: '',
        });
        setShowAddForm(false); // Fermez le formulaire après l'ajout
      } else {
        console.error('Erreur lors de l\'ajout de la compétence');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la compétence :', error);
    }
  };

  // Fonction pour mettre à jour une compétence
  const handleServiceUpdate = async (updatedService) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/updateservices/${updatedService.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedService),
      });

      if (response.ok) {
        const updatedservices = services.map((Service) =>
          Service.id === updatedService.id ? updatedService : Service
        );
        setservices(updatedservices);
        setEditingServiceId(null);
      } else {
        console.error('Erreur lors de la mise à jour de la compétence');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la compétence :', error);
    }
  };

  // Fonction pour supprimer une compétence
  const handleServiceDelete = async (ServiceId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/deleteservices/${ServiceId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedservices = services.filter((Service) => Service.id !== ServiceId);
        setservices(updatedservices);
      } else {
        console.error('Erreur lors de la suppression de la compétence');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la compétence :', error);
    }
  };

  // Supprimer une compétence avec confirmation
  const handleServiceDeleteWithConfirmation = (ServiceId) => {
    setServiceIdToDelete(ServiceId);
    setIsDeleteConfirmationOpen(true);
  };

  // Fonction pour confirmer la suppression et effectuer la suppression réelle
  const confirmServiceDelete = async () => {
    if (ServiceIdToDelete) {
      await handleServiceDelete(ServiceIdToDelete);
      setIsDeleteConfirmationOpen(false);
      setServiceIdToDelete(null);
    }
  };

  // Annuler la suppression
  const cancelServiceDelete = () => {
    setIsDeleteConfirmationOpen(false);
    setServiceIdToDelete(null);
  };

  const handleCancelUpdate = () => {
    setEditingServiceId(null); // Réinitialise l'état d'édition
  };

  useEffect(() => {
    // Mettez à jour l'aperçu de l'icône lorsque l'ID de compétence en édition change
    if (editingServiceId !== null) {
      const editedService = services.find((Service) => Service.id === editingServiceId);
      if (editedService) {
        setPreviewEditingServiceIconUrl(editedService.icon);
      }
    }
  }, [editingServiceId, services]);

  return (
    <PaddingContainer
      id="services"
      top="10%"
      bottom="10%"
      responsiveLeft="1rem"
      responsiveRight="1rem"
    >
      <FlexContainer
        responsiveFlex
        responsiveDirection="column-reverse"
        fullWidthChild
      >
        {/* left section */}
        <ServicesCardContainer
          id="ServiceIcon"
          as={motion.div}
          variants={fadeInLeftVariant}
          initial="hidden"
          whileInView="visible"
        >
          {services.map((Service) => (
            <ServicesCard key={Service.id}>
              {editingServiceId === Service.id ? (
                <form className='form-Service'
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleServiceUpdate({
                      id: Service.id,
                      service: e.target.service.value,
                      icon: e.target.icon.value,
                    });
                  }}
                >
                  <div className="input-text">
                    <label>Nom de la compétence</label>
                    <input
                      type="text"
                      placeholder="Nom de la compétence"
                      name="service"
                      defaultValue={Service.service}
                    />
                    <label>URL de l'icône</label>
                    <input
                      type="text"
                      placeholder="Url de l'icône"
                      name="icon"
                      defaultValue={Service.icon}
                      onInput={(e) => {
                        setEditingServiceId(Service.id); // Mettez à jour l'état d'édition
                        setPreviewEditingServiceIconUrl(e.target.value); // Mettez à jour l'aperçu de l'icône en temps réel
                      }}
                    />
                  </div>
                  {previewEditingServiceIconUrl && (
                    <img
                      src={previewEditingServiceIconUrl}
                      alt="IconPreviewEdit"
                      className="icon-preview"
                    />
                  )}
                  <button type="submit" className="update-button">Mettre à jour</button>
                  <button type="button" className="update-button" onClick={() => handleCancelUpdate()}>Annuler</button>
                </form>
              ) : (
                <>
                  <IconContainer style={{ fontSize: '1rem' }} color="blue">
                    <img
                      src={Service.icon} // Utilisez l'URL de l'image stockée dans la base de données
                      alt={Service.service} // Utilisez le nom de la compétence comme texte alternatif
                      className="icon-preview"
                    />
                  </IconContainer>
                  <Heading as="h4" size="h4">
                    {Service.service}
                  </Heading>
                  {IsInLogin && (
                    <Button onClick={() => setEditingServiceId(Service.id)}>Modifier</Button>
                  )}
                  {IsInLogin && (
                    <Button onClick={() => handleServiceDeleteWithConfirmation(Service.id)}>Supprimer</Button>
                  )}
                </>
              )}
            </ServicesCard>
          ))}


          {/* Formulaire d'ajout de compétence */}
          {IsInLogin && (

            <div>
              {showAddForm ? (
                <servicesCard>
                  <form className='form-Service'
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleServiceAdd();
                    }}
                  >
                    <div className="input-text">
                    <label>Nom de la compétence</label>
                    <input
                      type="text"
                      placeholder="Nom de la compétence"
                      value={newService.service}
                      onChange={(e) => setNewService({ ...newService, service: e.target.value })}
                    />
                    <label>Url de l'icône</label>
                    <input
                      type="text"
                      placeholder="Url de l'icône"
                      value={newService.icon}
                      onInput={(e) => {
                        setNewService({
                          ...newService,
                          icon: e.target.value,
                        });
                        setPreviewNewServiceIconUrl(e.target.value);
                      }}
                    />
                    </div>
                    {previewNewServiceIconUrl && (
                      <img
                        src={previewNewServiceIconUrl}
                        alt="IconPreview"
                        className="icon-preview"
                      />
                    )}
                    <Button type="submit" onClick={() => {
                      handleServiceAdd();
                    }}>Ajouter un Service</Button>
                    <Button onClick={() => setShowAddForm(false)}>Fermer</Button>
                  </form>
                </servicesCard>
              ) : (
                <Button onClick={() => setShowAddForm(true)}>Ajouter</Button>
              )}
            </div>
          )}

        </ServicesCardContainer>

        {/* right-section */}
        <motion.div variants={fadeInRightVariant} initial="hidden" whileInView="visible">
          <Heading as="h4" size="h4">
            
          </Heading>

          <Heading as="h2" size="h2" top="0.5rem">
            Nos <GreenText> Services</GreenText>
          </Heading>

          <ParaText
  id="desc"
  top="2rem"
  bottom="1.5rem"
  style={{ fontSize: '1.7rem', whiteSpace: 'pre-wrap' }}
>
  Bienvenue chez Dovia !
  
  Dites adieu aux problèmes d'eau dure. Nous installons rapidement, assurons une maintenance efficace, offrons des conseils directs, des analyses précises et des adoucisseurs écoénergétiques.
  
  Optez pour une eau sans tracas, contactez-nous dès maintenant.
</ParaText>




        </motion.div>
      </FlexContainer>

      {/* Boîte de dialogue de confirmation de suppression */}
      {isDeleteConfirmationOpen && (
        <div className="delete-confirmation-modal">
          <div>
            <p>Voulez-vous vraiment supprimer cette compétence ?</p>
            <div>
              <Button onClick={confirmServiceDelete}>Oui</Button>
              <Button onClick={cancelServiceDelete}>Annuler</Button>
            </div>
          </div>
        </div>
      )}
    </PaddingContainer>
  );
};

export default Myservices;