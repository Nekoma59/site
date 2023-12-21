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

// Import My Skills styles
import {
  SkillsCardContainer,
  SkillsCard,
} from '../../styles/MySkills.styled';

import {
  fadeInLeftVariant,
  fadeInRightVariant,
} from '../../utils/Variants';

const MySkills = ({ IsInLogin }) => {
  const [skills, setSkills] = useState([]);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false); // État pour la boîte de dialogue
  const [skillIdToDelete, setSkillIdToDelete] = useState(null); // État pour stocker l'ID de la compétence à supprimer
  const [previewNewSkillIconUrl, setPreviewNewSkillIconUrl] = useState(''); // État pour afficher l'URL de l'icône en prévisualisation
  const [previewEditingSkillIconUrl, setPreviewEditingSkillIconUrl] = useState(''); // État pour afficher l'URL de l'icône en édition en prévisualisation

  useEffect(() => {
    // Fonction pour charger les compétences depuis le backend
    const fetchSkills = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/getSkills');
        if (response.ok) {
          const data = await response.json();
          setSkills(data);
        } else {
          console.error('Réponse HTTP non OK :', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des compétences :', error.message);
      }
    };
    fetchSkills();
  }, []);

  const [newSkill, setNewSkill] = useState({
    tech: '',
    icon: '',
  });

  // Fonction pour ajouter une compétence
  const handleSkillAdd = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/insertSkills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSkill),
      });

      if (response.ok) {
        const addedSkill = await response.json();
        setSkills((prevSkills) => [...prevSkills, addedSkill]);
        setNewSkill({
          tech: '',
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
  const handleSkillUpdate = async (updatedSkill) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/updateSkills/${updatedSkill.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSkill),
      });

      if (response.ok) {
        const updatedSkills = skills.map((skill) =>
          skill.id === updatedSkill.id ? updatedSkill : skill
        );
        setSkills(updatedSkills);
        setEditingSkillId(null);
      } else {
        console.error('Erreur lors de la mise à jour de la compétence');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la compétence :', error);
    }
  };

  // Fonction pour supprimer une compétence
  const handleSkillDelete = async (skillId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/deleteSkills/${skillId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedSkills = skills.filter((skill) => skill.id !== skillId);
        setSkills(updatedSkills);
      } else {
        console.error('Erreur lors de la suppression de la compétence');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la compétence :', error);
    }
  };

  // Supprimer une compétence avec confirmation
  const handleSkillDeleteWithConfirmation = (skillId) => {
    setSkillIdToDelete(skillId);
    setIsDeleteConfirmationOpen(true);
  };

  // Fonction pour confirmer la suppression et effectuer la suppression réelle
  const confirmSkillDelete = async () => {
    if (skillIdToDelete) {
      await handleSkillDelete(skillIdToDelete);
      setIsDeleteConfirmationOpen(false);
      setSkillIdToDelete(null);
    }
  };

  // Annuler la suppression
  const cancelSkillDelete = () => {
    setIsDeleteConfirmationOpen(false);
    setSkillIdToDelete(null);
  };

  const handleCancelUpdate = () => {
    setEditingSkillId(null); // Réinitialise l'état d'édition
  };

  useEffect(() => {
    // Mettez à jour l'aperçu de l'icône lorsque l'ID de compétence en édition change
    if (editingSkillId !== null) {
      const editedSkill = skills.find((skill) => skill.id === editingSkillId);
      if (editedSkill) {
        setPreviewEditingSkillIconUrl(editedSkill.icon);
      }
    }
  }, [editingSkillId, skills]);

  return (
    <PaddingContainer
      id="Skills"
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
        <SkillsCardContainer
          id="skillIcon"
          as={motion.div}
          variants={fadeInLeftVariant}
          initial="hidden"
          whileInView="visible"
        >
          {skills.map((skill) => (
            <SkillsCard key={skill.id}>
              {editingSkillId === skill.id ? (
                <form className='form-skill'
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSkillUpdate({
                      id: skill.id,
                      tech: e.target.tech.value,
                      icon: e.target.icon.value,
                    });
                  }}
                >
                  <div className="input-text">
                    <label>Nom de la compétence</label>
                    <input
                      type="text"
                      placeholder="Nom de la compétence"
                      name="tech"
                      defaultValue={skill.tech}
                    />
                    <label>URL de l'icône</label>
                    <input
                      type="text"
                      placeholder="Url de l'icône"
                      name="icon"
                      defaultValue={skill.icon}
                      onInput={(e) => {
                        setEditingSkillId(skill.id); // Mettez à jour l'état d'édition
                        setPreviewEditingSkillIconUrl(e.target.value); // Mettez à jour l'aperçu de l'icône en temps réel
                      }}
                    />
                  </div>
                  {previewEditingSkillIconUrl && (
                    <img
                      src={previewEditingSkillIconUrl}
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
                      src={skill.icon} // Utilisez l'URL de l'image stockée dans la base de données
                      alt={skill.tech} // Utilisez le nom de la compétence comme texte alternatif
                      className="icon-preview"
                    />
                  </IconContainer>
                  <Heading as="h4" size="h4">
                    {skill.tech}
                  </Heading>
                  {IsInLogin && (
                    <Button onClick={() => setEditingSkillId(skill.id)}>Modifier</Button>
                  )}
                  {IsInLogin && (
                    <Button onClick={() => handleSkillDeleteWithConfirmation(skill.id)}>Supprimer</Button>
                  )}
                </>
              )}
            </SkillsCard>
          ))}


          {/* Formulaire d'ajout de compétence */}
          {IsInLogin && (

            <div>
              {showAddForm ? (
                <SkillsCard>
                  <form className='form-skill'
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSkillAdd();
                    }}
                  >
                    <div className="input-text">
                    <label>Nom de la compétence</label>
                    <input
                      type="text"
                      placeholder="Nom de la compétence"
                      value={newSkill.tech}
                      onChange={(e) => setNewSkill({ ...newSkill, tech: e.target.value })}
                    />
                    <label>Url de l'icône</label>
                    <input
                      type="text"
                      placeholder="Url de l'icône"
                      value={newSkill.icon}
                      onInput={(e) => {
                        setNewSkill({
                          ...newSkill,
                          icon: e.target.value,
                        });
                        setPreviewNewSkillIconUrl(e.target.value);
                      }}
                    />
                    </div>
                    {previewNewSkillIconUrl && (
                      <img
                        src={previewNewSkillIconUrl}
                        alt="IconPreview"
                        className="icon-preview"
                      />
                    )}
                    <Button type="submit" onClick={() => {
                      handleSkillAdd();
                    }}>Ajouter un Skill</Button>
                    <Button onClick={() => setShowAddForm(false)}>Fermer</Button>
                  </form>
                </SkillsCard>
              ) : (
                <Button onClick={() => setShowAddForm(true)}>Ajouter</Button>
              )}
            </div>
          )}

        </SkillsCardContainer>

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
              <Button onClick={confirmSkillDelete}>Oui</Button>
              <Button onClick={cancelSkillDelete}>Annuler</Button>
            </div>
          </div>
        </div>
      )}
    </PaddingContainer>
  );
};

export default MySkills;