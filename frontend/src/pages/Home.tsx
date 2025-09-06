import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Chip,
  Grid,
  Paper,
  Divider,
  IconButton,
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  Work,
  School,
  Code,
  Language,
  GitHub,
  LinkedIn,
  Web,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../store/languageStore';
import { useThemeStore } from '../store/themeStore';
import { cvApi } from '../services/api';

interface CVData {
  personalInfo: {
    fullName: { vi: string; en: string };
    title: { vi: string; en: string };
    email: string;
    phone: string;
    location: { vi: string; en: string };
    profileImage?: string;
    summary: { vi: string; en: string };
  };
  experience: Array<{
    _id: string;
    company: { vi: string; en: string };
    position: { vi: string; en: string };
    startDate: string;
    endDate?: string;
    current: boolean;
    description: { vi: string; en: string };
    technologies: string[];
  }>;
  education: Array<{
    _id: string;
    institution: { vi: string; en: string };
    degree: { vi: string; en: string };
    startDate: string;
    endDate?: string;
    current: boolean;
    description?: { vi: string; en: string };
  }>;
  skills: {
    technical: Array<{
      name: string;
      level: number;
      category: string;
    }>;
    languages: Array<{
      name: string;
      level: { vi: string; en: string };
    }>;
  };
  projects: Array<{
    _id: string;
    name: { vi: string; en: string };
    description: { vi: string; en: string };
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    image?: string;
  }>;
  socialLinks: {
    github?: string;
    linkedin?: string;
    website?: string;
  };
}

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const { isDarkMode } = useThemeStore();
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCVData = async () => {
      try {
        const data = await cvApi.getCV();
        setCvData(data);
      } catch (error) {
        console.error('Error fetching CV data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCVData();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (!cvData) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>CV not found</Typography>
      </Container>
    );
  }

  const getLocalizedText = (text: { vi: string; en: string }) => {
    return language === 'vi' ? text.vi : text.en;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Card sx={{ mb: 4, textAlign: 'center' }}>
        <CardContent sx={{ py: 4 }}>
          <Avatar
            src={cvData.personalInfo.profileImage}
            sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
          >
            {cvData.personalInfo.fullName[language].charAt(0)}
          </Avatar>
          <Typography variant="h3" component="h1" gutterBottom>
            {getLocalizedText(cvData.personalInfo.fullName)}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            {getLocalizedText(cvData.personalInfo.title)}
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}>
            {getLocalizedText(cvData.personalInfo.summary)}
          </Typography>
          
          {/* Contact Info */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Email fontSize="small" />
              <Typography variant="body2">{cvData.personalInfo.email}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Phone fontSize="small" />
              <Typography variant="body2">{cvData.personalInfo.phone}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOn fontSize="small" />
              <Typography variant="body2">{getLocalizedText(cvData.personalInfo.location)}</Typography>
            </Box>
          </Box>

          {/* Social Links */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
            {cvData.socialLinks.github && (
              <IconButton href={cvData.socialLinks.github} target="_blank">
                <GitHub />
              </IconButton>
            )}
            {cvData.socialLinks.linkedin && (
              <IconButton href={cvData.socialLinks.linkedin} target="_blank">
                <LinkedIn />
              </IconButton>
            )}
            {cvData.socialLinks.website && (
              <IconButton href={cvData.socialLinks.website} target="_blank">
                <Web />
              </IconButton>
            )}
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={4}>
        {/* Experience */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Work />
              {t('experience')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {cvData.experience.map((exp) => (
              <Box key={exp._id} sx={{ mb: 3 }}>
                <Typography variant="h6" color="primary">
                  {getLocalizedText(exp.position)}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {getLocalizedText(exp.company)}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {formatDate(exp.startDate)} - {exp.current ? t('current') : formatDate(exp.endDate || '')}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {getLocalizedText(exp.description)}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {exp.technologies.map((tech) => (
                    <Chip key={tech} label={tech} size="small" variant="outlined" />
                  ))}
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Education */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <School />
              {t('education')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {cvData.education.map((edu) => (
              <Box key={edu._id} sx={{ mb: 3 }}>
                <Typography variant="h6" color="primary">
                  {getLocalizedText(edu.degree)}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {getLocalizedText(edu.institution)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(edu.startDate)} - {edu.current ? t('current') : formatDate(edu.endDate || '')}
                </Typography>
                {edu.description && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {getLocalizedText(edu.description)}
                  </Typography>
                )}
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Skills */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Code />
              {t('skills')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            {/* Technical Skills */}
            <Typography variant="h6" gutterBottom>
              Technical Skills
            </Typography>
            <Box sx={{ mb: 3 }}>
              {cvData.skills.technical.map((skill) => (
                <Box key={skill.name} sx={{ mb: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">{skill.name}</Typography>
                    <Typography variant="body2">{skill.level}/5</Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      height: 6,
                      backgroundColor: isDarkMode ? '#333' : '#e0e0e0',
                      borderRadius: 3,
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        width: `${(skill.level / 5) * 100}%`,
                        height: '100%',
                        backgroundColor: 'primary.main',
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Languages */}
            <Typography variant="h6" gutterBottom>
              Languages
            </Typography>
            {cvData.skills.languages.map((lang) => (
              <Box key={lang.name} sx={{ mb: 1 }}>
                <Typography variant="body2">
                  {lang.name} - {getLocalizedText(lang.level)}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Projects */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Code />
              {t('projects')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {cvData.projects.map((project) => (
              <Box key={project._id} sx={{ mb: 3 }}>
                <Typography variant="h6" color="primary">
                  {getLocalizedText(project.name)}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {getLocalizedText(project.description)}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                  {project.technologies.map((tech) => (
                    <Chip key={tech} label={tech} size="small" variant="outlined" />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {project.githubUrl && (
                    <IconButton href={project.githubUrl} target="_blank" size="small">
                      <GitHub fontSize="small" />
                    </IconButton>
                  )}
                  {project.liveUrl && (
                    <IconButton href={project.liveUrl} target="_blank" size="small">
                      <Web fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
