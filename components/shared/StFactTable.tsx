import {
  Avatar,
  Table,
  Group,
  Text,
  ActionIcon,
  Menu,
  ScrollArea,
  Anchor,
  Flex,
} from '@mantine/core';
import {
  IconPencil,
  IconMessages,
  IconNote,
  IconReportAnalytics,
  IconTrash,
  IconDots,
} from '@tabler/icons';

interface StFactTableProps {
  loading: boolean;
  facts: FactTableItem[];
}

export enum FactTableType {
  TEXT = 'text',
  COLOR = 'color',
  LINK = 'linka',
}

export type FactTableItem = {
  value: string | null | undefined;
  label: string;
  type?: FactTableType;
};

export function StFactTable(props: StFactTableProps) {
  if (props.loading || !props.facts) {
    return <div>loading</div>;
  }

  const rows = props.facts.map((fact) => (
    <tr key={fact.label}>
      <td>
        <Text fz="sm">{fact.label}</Text>
      </td>
      {fact.type === FactTableType.LINK && (
        <td>
          <Anchor href={fact.value || ''} fz="sm" target="_blank">
            Link
          </Anchor>
          <Text fz="xs" c="dimmed">
            {fact.value}
          </Text>
        </td>
      )}
      {fact.type === FactTableType.COLOR && (
        <td>
          <Flex align="center" justify="start">
            <div
              style={{
                backgroundColor: fact.value || 'black',
                width: '25px',
                height: '25px',
              }}
            ></div>
          </Flex>
        </td>
      )}
      {fact.type === FactTableType.TEXT && (
        <td>
          <Text fz="xs">{fact.value}</Text>
        </td>
      )}
    </tr>
  ));

  return (
    <ScrollArea sx={{ width: '100%' }}>
      <Table sx={{ minWidth: 800 }} verticalSpacing="md">
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
