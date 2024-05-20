"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPermissionById, updatePermission, SelectPermission, ModifyPermissionDto } from '@/lib/api'; // Asegúrate de ajustar el path a la ubicación correcta
import Link from 'next/link';
import { CheckIcon, ClockIcon, UserCircleIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/buttonsend';

type Props = {
  params: {
    id: string;
  };
};

// Función para formatear la fecha
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const ModifyPermission = ({ params }: Props) => {
  const { id } = params;
  const router = useRouter(); // Usar el hook useRouter
  const [permission, setPermission] = useState<SelectPermission | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<{
    id: number;
    employeeForename: string;
    employeeSurname: string;
    permissionDate: string;
    permissionTypeId: number;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPermissionById(id);
        console.log(result);
        const formattedPermission: ModifyPermissionDto = {
          id: result.permissions.id,
          employeeForename: result.permissions.employeeForename,
          employeeSurname: result.permissions.employeeSurname,
          permissionDate: formatDate(result.permissions.permissionDate),
          permissionTypeId: result.permissions.permissionType.id,
        };
        setPermission(result.permissions);
        setFormValues(formattedPermission);
      } catch (error) {
        setError('Failed to fetch permission');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (formValues) {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formValues) {
      try {
        await updatePermission(id, formValues);
        alert('Permission updated successfully');
        router.push('/'); // Redirigir al usuario a la página principal
      } catch (error) {
        setError('Failed to update permission');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-md bg-gray-50 p-4 md:p-6">
      <div className="mb-4">
        <label htmlFor="employeeForename" className="mb-2 block text-sm font-medium">
          Nombre
        </label>
        <div className="relative">
          <input
            id="employeeForename"
            name="employeeForename"
            type="text"
            value={formValues?.employeeForename || ''}
            onChange={handleChange}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          />
          <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="employeeSurname" className="mb-2 block text-sm font-medium">
          Apellido
        </label>
        <div className="relative">
          <input
            id="employeeSurname"
            name="employeeSurname"
            type="text"
            value={formValues?.employeeSurname || ''}
            onChange={handleChange}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          />
          <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="permissionDate" className="mb-2 block text-sm font-medium">
          Fecha Del Permiso
        </label>
        <div className="relative">
          <input
            id="permissionDate"
            name="permissionDate"
            type="date"
            value={formValues?.permissionDate || ''}
            onChange={handleChange}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          />
          <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="permissionType" className="mb-2 block text-sm font-medium">
          Motivo
        </label>
        <div className="relative">
          <select
            id="permissionType"
            name="permissionTypeId"
            value={formValues?.permissionTypeId || ''}
            onChange={handleChange}
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          >
            <option value="" disabled>
              Seleccione el motivo
            </option>
            <option value="1">Vacaciones</option>
            <option value="2">Día por enfermedad</option>
            <option value="3">Permiso personal</option>
            <option value="4">Permiso sin sueldo</option>
          </select>
          <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/permissions"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Actualizar Permiso</Button>
      </div>
    </form>
  );
};

export default ModifyPermission;
