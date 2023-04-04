import axios from 'axios';

const API_URL = '/api/user/projects';

const projectService = {
  createProject: async (projectData) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      throw new Error('User not authenticated');
    }

    const { token } = user;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(API_URL + '/new-project', projectData, {
      headers,
    });

    return response.data;
  },

  getAllProjects: async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      throw new Error('User not authenticated');
    }

    const { token } = user;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API_URL, {
      headers,
    });

    return response.data;
  },

//   updateProject: async (projectId, projectData) => {
//     const user = JSON.parse(localStorage.getItem('user'));

//     if (!user) {
//       throw new Error('User not authenticated');
//     }

//     const { token } = user;
//     const headers = {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     };

//     const response = await axios.patch(`${API_URL}/${projectId}`, projectData, {
//       headers,
//     });

//     return response.data;
//   },

//   deleteProject: async (projectId) => {
//     const user = JSON.parse(localStorage.getItem('user'));

//     if (!user) {
//       throw new Error('User not authenticated');
//     }

//     const { token } = user;
//     const headers = {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     };

//     const response = await axios.delete(`${API_URL}/${projectId}`, {
//       headers,
//     });

//     return response.data;
//   },
};

export default projectService;
