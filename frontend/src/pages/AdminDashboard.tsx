import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardContent,
  IconButton,
  Chip,
  Alert,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Save,
  Cancel,
  Person,
  Work,
  School,
  Code,
  Upload,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../store/languageStore';
import { cvApi } from '../services/api';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const [tabValue, setTabValue] = useState(0);
  const [cvData, setCvData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCVData();
  }, []);

  const fetchCVData = async () => {
    try {
      const data = await cvApi.getAdminCV();
      setCvData(data);
    } catch (error) {
      console.error('Error fetching CV data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (type: string, item?: any) => {
    setDialogType(type);
    setEditingItem(item);
    setFormData(item || {});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
    setFormData({});
  };

  const handleSave = async () => {
    try {
      if (dialogType === 'personalInfo') {
        await cvApi.updateCV({ personalInfo: formData });
      } else if (dialogType === 'experience') {
        if (editingItem) {
          // Update existing experience
          const updatedExperience = cvData.experience.map((exp: any) =>
            exp._id === editingItem._id ? { ...exp, ...formData } : exp
          );
          await cvApi.updateCV({ experience: updatedExperience });
        } else {
          // Add new experience
          await cvApi.addExperience(formData);
        }
      }
      // Add similar logic for other sections
      
      setMessage('Saved successfully!');
      fetchCVData();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving:', error);
      setMessage('Error saving data');
    }
  };

  const handleDelete = async (type: string, id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        if (type === 'experience') {
          await cvApi.deleteExperience(id);
        }
        // Add similar logic for other sections
        fetchCVData();
        setMessage('Deleted successfully!');
      } catch (error) {
        console.error('Error deleting:', error);
        setMessage('Error deleting data');
      }
    }
  };

  const getLocalizedText = (text: { vi: string; en: string }) => {
    return language === 'vi' ? text.vi : text.en;
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {t('adminDashboard')}
      </Typography>

      {message && (
        <Alert 
          severity={message.includes('Error') ? 'error' : 'success'} 
          sx={{ mb: 2 }}
          onClose={() => setMessage('')}
        >
          {message}
        </Alert>
      )}

      <Paper sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab icon={<Person />} label={t('personalInfo')} />
            <Tab icon={<Work />} label={t('experience')} />
            <Tab icon={<School />} label={t('education')} />
            <Tab icon={<Code />} label={t('skills')} />
            <Tab icon={<Code />} label={t('projects')} />
          </Tabs>
        </Box>

        {/* Personal Information Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">{t('personalInfo')}</Typography>
            <Button
              variant="contained"
              startIcon={<Edit />}
              onClick={() => handleOpenDialog('personalInfo', cvData.personalInfo)}
            >
              {t('edit')}
            </Button>
          </Box>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {getLocalizedText(cvData.personalInfo.fullName)}
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    {getLocalizedText(cvData.personalInfo.title)}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {cvData.personalInfo.email}
                  </Typography>
                  <Typography variant="body2">
                    {cvData.personalInfo.phone}
                  </Typography>
                  <Typography variant="body2">
                    {getLocalizedText(cvData.personalInfo.location)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {t('summary')}
                  </Typography>
                  <Typography variant="body2">
                    {getLocalizedText(cvData.personalInfo.summary)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Experience Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">{t('experience')}</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleOpenDialog('experience')}
            >
              {t('add')}
            </Button>
          </Box>

          {cvData.experience.map((exp: any) => (
            <Card key={exp._id} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" color="primary">
                      {getLocalizedText(exp.position)}
                    </Typography>
                    <Typography variant="subtitle1">
                      {getLocalizedText(exp.company)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(exp.startDate).toLocaleDateString()} - {exp.current ? t('current') : new Date(exp.endDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {getLocalizedText(exp.description)}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                      {exp.technologies.map((tech: string) => (
                        <Chip key={tech} label={tech} size="small" />
                      ))}
                    </Box>
                  </Box>
                  <Box>
                    <IconButton onClick={() => handleOpenDialog('experience', exp)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete('experience', exp._id)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </TabPanel>

        {/* Other tabs would be similar... */}
      </Paper>

      {/* Dialog for editing */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingItem ? t('edit') : t('add')} {dialogType}
        </DialogTitle>
        <DialogContent>
          {dialogType === 'personalInfo' && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={`${t('name')} (VI)`}
                  value={formData.fullName?.vi || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    fullName: { ...formData.fullName, vi: e.target.value }
                  })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={`${t('name')} (EN)`}
                  value={formData.fullName?.en || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    fullName: { ...formData.fullName, en: e.target.value }
                  })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={`${t('position')} (VI)`}
                  value={formData.title?.vi || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    title: { ...formData.title, vi: e.target.value }
                  })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={`${t('position')} (EN)`}
                  value={formData.title?.en || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    title: { ...formData.title, en: e.target.value }
                  })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t('email')}
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t('phone')}
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </Grid>
            </Grid>
          )}
          
          {dialogType === 'experience' && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={`${t('company')} (VI)`}
                  value={formData.company?.vi || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    company: { ...formData.company, vi: e.target.value }
                  })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={`${t('company')} (EN)`}
                  value={formData.company?.en || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    company: { ...formData.company, en: e.target.value }
                  })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={`${t('position')} (VI)`}
                  value={formData.position?.vi || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    position: { ...formData.position, vi: e.target.value }
                  })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={`${t('position')} (EN)`}
                  value={formData.position?.en || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    position: { ...formData.position, en: e.target.value }
                  })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t('startDate')}
                  type="date"
                  value={formData.startDate || ''}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t('endDate')}
                  type="date"
                  value={formData.endDate || ''}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label={`${t('description')} (VI)`}
                  value={formData.description?.vi || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    description: { ...formData.description, vi: e.target.value }
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label={`${t('description')} (EN)`}
                  value={formData.description?.en || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    description: { ...formData.description, en: e.target.value }
                  })}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} startIcon={<Cancel />}>
            {t('cancel')}
          </Button>
          <Button onClick={handleSave} variant="contained" startIcon={<Save />}>
            {t('save')}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;
