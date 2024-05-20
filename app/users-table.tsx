'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { SelectPermission } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns'; // Importar la función format de date-fns

export function PermissionsTable({
  permissions,
  offset
}: {
  permissions: SelectPermission[];
  offset: number | null;
}) {
  const router = useRouter();

  function onClick() {
    router.replace(`/?offset=${offset}`);
  }

  return (
    <>
      <form className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[150px]">Nombre Completo</TableHead>
              <TableHead className="hidden md:table-cell">Tipo De Permiso</TableHead>
              <TableHead className="hidden md:table-cell">Fecha Del Permiso</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions.map((permission) => (
              <PermissionRow key={permission.id} permission={permission} />
            ))}
          </TableBody>
        </Table>
      </form>
      {offset !== null && (
        <Button
          className="mt-4 w-40"
          variant="secondary"
          onClick={() => onClick()}
        >
          Next Page
        </Button>
      )}
    </>
  );
}

function PermissionRow({ permission }: { permission: SelectPermission }) {
  const permissionId = permission.id;
  const formattedDate = format(new Date(permission.permissionDate), 'dd/MM/yyyy'); // Formatear la fecha

  return (
    <TableRow>
      <TableCell className="font-medium">{ `${permission.employeeForename} ${permission.employeeSurname}` }</TableCell>
      <TableCell className="hidden md:table-cell">{permission.permissionType.description}</TableCell>
      <TableCell>{formattedDate}</TableCell> {/* Mostrar la fecha formateada */}
      <TableCell>
      <Link href={`/modifypermission/${permissionId}`} className="w-full">
      <Button
        className="w-full"
        size="sm"
        variant="outline"
      >
        Update
      </Button>
    </Link>
      </TableCell>
    </TableRow>
  );
}
