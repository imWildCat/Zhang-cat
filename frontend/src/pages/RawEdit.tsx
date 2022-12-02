import SingleFileEdit from '../components/SingleFileEdit';
import { useQuery } from '@apollo/client';
import { Tabs } from '@mantine/core';
import { FileListQuery, FILE_LIST } from '../gql/fileList';
import { Container } from '@mantine/core';
import useSWR from 'swr';
import { fetcher } from '..';

function RawEdit() {
  const {data, error} = useSWR<string[]>("/api/files", fetcher)

  if (error) return <div>failed to load</div>;
  if (!data) return <>loading</>;
  return (
    <Container fluid>
      <Tabs orientation="vertical">
        <Tabs.List>
          {data.map((entry) => (
            <Tabs.Tab value={entry}>{entry}</Tabs.Tab>
          ))}
        </Tabs.List>

        {data.map((entry) => (
          <Tabs.Panel value={entry} pt="xs">
            <SingleFileEdit name={entry} path={entry} />
          </Tabs.Panel>
        ))}
      </Tabs>
    </Container>
  );
}

export default RawEdit;
