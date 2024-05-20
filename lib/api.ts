import axios from 'axios';

// Definir el tipo SelectPermission
export type SelectPermission = {
  id: number;
  employeeForename: string;
  employeeSurname: string;
  permissionDate: string;
  permissionType: {
    id: number;
    description: string;
  };
};

// Definir la interfaz ModifyPermissionDto
export interface ModifyPermissionDto {
  id: number;
  employeeForename: string;
  employeeSurname: string;
  permissionDate: string;
  permissionTypeId: number;
}

// Definir la interfaz CreatePermissionDto
export interface CreatePermissionDto {
  employeeForename: string;
  employeeSurname: string;
  permissionDate: string;
  permissionTypeId: number;
}

// Función para obtener permisos con paginación
export async function getPermissions(
  search: string,
  offset: number
): Promise<{
  permissions: SelectPermission[];
  newOffset: number | null;
}> {
  try {
    const response = await axios.get(`http://localhost:5207/api/Permissions`);
    const permissions = response.data;
    const totalPermissions = response.data.total;

    const hasMorePermissions = offset + 5 < totalPermissions;
    const newOffset = hasMorePermissions ? offset + 5 : null;

    return {
      permissions,
      newOffset,
    };
  } catch (error) {
    console.error("Failed to fetch permissions:", error);
    return {
      permissions: [],
      newOffset: null,
    };
  }
}

// Función para obtener un permiso por ID
export async function getPermissionById(id: string): Promise<{ permissions: SelectPermission }> {
  try {
    const response = await axios.get(`http://localhost:5207/api/Permissions/id?id=${id}`);
    const permissions: SelectPermission = response.data;
    return { permissions };
  } catch (error) {
    console.error(`Failed to fetch permission with id ${id}:`, error);
    throw error;
  }
}

// Función para actualizar un permiso por ID
export async function updatePermission(id: string, permissionData: ModifyPermissionDto): Promise<void> {
  try {
    await axios.put(`http://localhost:5207/api/Permissions/${id}`, permissionData);
  } catch (error) {
    console.error(`Failed to update permission with id ${id}:`, error);
    throw error;
  }
}

// Función para crear un nuevo permiso
export async function createPermission(permissionData: CreatePermissionDto): Promise<void> {
  try {
    await axios.post('http://localhost:5207/api/Permissions', permissionData);
  } catch (error) {
    console.error('Failed to create permission:', error);
    throw error;
  }
}
