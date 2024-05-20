"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPermission, CreatePermissionDto } from '@/lib/api'; // Asegúrate de ajustar el path a la ubicación correcta
import Link from 'next/link';
import { CheckIcon, ClockIcon, UserCircleIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/buttonsend';

// Función para obtener la fecha actual en el formato yyyy-MM-dd
const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const CreatePermission = () => {
  const router = useRouter(); // Usar el hook useRouter
  const [formValues, setFormValues] = useState<CreatePermissionDto>({
    employeeForename: '',
    employeeSurname: '',
    permissionDate: getCurrentDate(),
    permissionTypeId: 1, // Valor por defecto
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: name === 'permissionTypeId' ? parseInt(value) : value, // Convertir permissionTypeId a número
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPermission(formValues);
      alert('Permission created successfully');
      router.push('/'); // Redirigir al usuario a la página principal
    } catch (error) {
      console.error('Failed to create permission:', error);
    }
  };

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
            value={formValues.employeeForename}
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
            value={formValues.employeeSurname}
            onChange={handleChange}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          />
          <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="permissionDate" className="mb-2 block text-sm font-medium">
          Fecha del permiso
        </label>
        <div className="relative">
          <input
            id="permissionDate"
            name="permissionDate"
            type="date"
            value={formValues.permissionDate}
            onChange={handleChange}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          />
          <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="permissionTypeId" className="mb-2 block text-sm font-medium">
          Motivo
        </label>
        <div className="relative">
          <select
            id="permissionTypeId"
            name="permissionTypeId"
            value={formValues.permissionTypeId}
            onChange={handleChange}
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          >
            <option value={1}>Vacaciones</option>
            <option value={2}>Día por enfermedad</option>
            <option value={3}>Permiso personal</option>
            <option value={4}>Permiso sin sueldo</option>
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
        <Button type="submit">Solicitar Permiso</Button>
      </div>
    </form>
  );
};

export default CreatePermission;
