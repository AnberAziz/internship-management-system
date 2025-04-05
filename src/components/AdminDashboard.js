import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

// Material-UI Components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';

// Table and Form Components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// Styling Theme
const theme = {
  primary: '#1976d2',
  secondary: '#d32f2f',
  background: '#f5f5f5'
};

function AdminDashboard() {
  // State Management
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, name: 'React Tutorial', deadline: '2023-10-15', status: 'Pending' },
    { id: 2, name: 'API Integration', deadline: '2023-10-20', status: 'Completed' },
  ]);
  const [newTask, setNewTask] = useState({ name: '', deadline: '' });
  const [editTask, setEditTask] = useState(null);
    // Delete Task State
  const [deleteTask, setDeleteTask] = useState(null);
  // Error State
  const [formError, setFormError] = useState(false);

  // Sidebar Configuration
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
    { text: 'Manage Interns', icon: <PeopleIcon />, path: '/admin/interns' },
    { text: 'Tasks', icon: <AssignmentIcon />, path: '/admin/tasks' },
  ];

  const activeStyle = {
    backgroundColor: '#e0e0e0',
    fontWeight: 'bold',
  };

  // Task Handlers
  const handleCreateTask = () => {
    if (newTask.name.trim() && newTask.deadline) {
      setTasks([...tasks, {
        id: tasks.length + 1,
        ...newTask,
        status: 'Pending'
      }]);
      setNewTask({ name: '', deadline: '' });
      setOpen(false);
    } else {
        setFormError(true);
    }
    
  };


  const toggleStatus = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'Pending' ? 'Completed' : 'Pending' } 
        : task
    ));
  };


  return (
    <div style={{ display: 'flex' }}>
      {/* ----------- NAVBAR ----------- */}
      <AppBar position="fixed" sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: theme.primary
      }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }}>
            Admin Dashboard
          </Typography>
          <Button 
            color="inherit" 
            startIcon={<LogoutIcon sx={{ color: 'white' }} />}
            sx={{ color: 'white' }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* ----------- SIDEBAR ----------- */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': { 
            width: 240, 
            boxSizing: 'border-box',
            backgroundColor: theme.background
          },
        }}
      >
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.text}
              style={({ isActive }) => ({
                textDecoration: 'none',
                color: 'inherit',
                ...(isActive && activeStyle),
              })}
            >
              <ListItem button>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Drawer>

      {/* ----------- MAIN CONTENT ----------- */}
      <div style={{ 
        flexGrow: 1, 
        padding: '20px', 
        marginLeft: '240px', 
        marginTop: '64px',
        backgroundColor: '#fafafa'
      }}>
        {/* Create New Task Button */}
        <Button 
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{ 
            mb: 2,
            backgroundColor: theme.primary,
            '&:hover': { backgroundColor: '#1565c0' }
          }}
        >
          Create New Task
        </Button>

        {/* Tasks Table */}
        <TableContainer 
          component={Paper}
          sx={{ 
            boxShadow: 3,
            '& .MuiTableCell-head': { 
              fontWeight: 'bold', 
              backgroundColor: theme.background 
            }
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task Name</TableCell>
                <TableCell>Deadline</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow 
                  key={task.id}
                  sx={{ '&:nth-of-type(odd)': { backgroundColor: theme.background } }}
                >
                  <TableCell>{task.name}</TableCell>
                  <TableCell>{task.deadline}</TableCell>
                  <TableCell>
                    <span style={{ 
                      color: task.status === 'Completed' ? '#2e7d32' : theme.secondary,
                      fontWeight: 'bold'
                    }}>
                      {task.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button  
                      color="primary"
                      variant="contained"
                      size="small"
                      onClick={() => toggleStatus(task.id)}
                      sx={{ 
                            backgroundColor: task.status === 'Completed' ? '#2e7d32' : theme.secondary,
                        '&:hover': { 
                            backgroundColor: task.status === 'Completed' ? '#1b5e20' : '#b71c1c' 
        }
        }}
                        >
                     {task.status}
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="error"
                      onClick={() => setDeleteTask(task)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Create Task Dialog */}
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Task Name"
              fullWidth
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              sx={{ mt: 2 }}
            />
            <TextField
              margin="dense"
              label="Deadline"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={newTask.deadline}
              onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateTask} variant="contained">
              Create
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Task Dialog */}
        <Dialog open={Boolean(editTask)} onClose={() => setEditTask(null)}>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Task Name"
              fullWidth
              value={editTask?.name || ''}
              onChange={(e) => setEditTask({ ...editTask, name: e.target.value })}
              error={formError && !newTask.name}
              helperText={formError && !newTask.name ? "Task name is required" : ""}
            />
            <TextField
              margin="dense"
              label="Deadline"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={editTask?.deadline || ''}
              onChange={(e) => setEditTask({ ...editTask, deadline: e.target.value })}
              error={formError && !newTask.deadline}
              helperText={formError && !newTask.deadline ? "Deadline is required" : ""}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditTask(null)}>Cancel</Button>
            <Button 
              onClick={() => {
                setTasks(tasks.map(t => t.id === editTask.id ? editTask : t));
                setEditTask(null);
              }} 
              variant="contained"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Task Dialog */}
        <Dialog open={Boolean(deleteTask)} onClose={() => setDeleteTask(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
            Are you sure you want to delete "{deleteTask?.name}"?
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setDeleteTask(null)}>Cancel</Button>
            <Button 
            onClick={() => {
                setTasks(tasks.filter(t => t.id !== deleteTask.id));
                setDeleteTask(null);
            }} 
            variant="contained" 
            color="error"
            >
            Confirm Delete
            </Button>
        </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default AdminDashboard;