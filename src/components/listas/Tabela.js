import React, { useMemo } from 'react';
import { useSortBy, useTable } from 'react-table';
import styled from 'styled-components';

const ListaItens = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: ${({ theme }) => theme.boxes.boxShadow};
`;

ListaItens.Header = styled.tr`
  border-radius: ${({ theme }) => theme.boxes.borderRadius} ${({ theme }) => theme.boxes.borderRadius} 0 0;
  color: ${({ theme }) => theme.colors.pText};

  th {
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.medium} ${({ theme }) => theme.spacing.small};
  font-size: ${({ theme }) => theme.font.small};
  }
  th:first-child {
  border-radius: ${({ theme }) => theme.boxes.borderRadius} 0 0 0;
  }

  th:last-child {
  border-radius: 0 ${({ theme }) => theme.boxes.borderRadius} 0 0;
  }
`;

ListaItens.Item = styled.tr`

  td {
    background-color: ${({ theme }) => theme.colors.bgColorDark};
    border-top: #fff solid 2px;
    color: #1d1d1d;
    font-size: ${({ theme }) => theme.font.small};
    padding: ${({ theme }) => theme.spacing.medium} ${({ theme }) => theme.spacing.small};
    text-align: center;
    text-decoration: none;
  }

  .tag {
    border-radius: 15px;
    padding: 0.2rem ${({ theme }) => theme.spacing.medium};
    font-size: calc(${({ theme }) => theme.font.small} - 0.1rem);
    font-weight: 500;
    color: #ffffff;
  }

  .tag-amarela {
    background-color: #d8a200;
  }

  .tag-verde {
    background-color: #189a37;
  }
  .tag-azul {
    background-color: #1976d2;
  }
  .tag-roxa {
    background-color: #9c27b0;
  }
  .tag-marrom {
    background-color: #795548;
  }
  .tag-preta {
    background-color: #404040;
  }
  .tag-vermelha {
    background-color: #c72d22;
  }

  .primary:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  .secondary:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Tabela = ({ header, dataArray, columnSortedDefault }) => {
  const columns = useMemo(() => header, [header]);

  const data = useMemo(() => dataArray, [dataArray]);

  const tableInstance = useTable({
    columns, 
    data, 
    autoResetSortBy: false, 
    initialState: {
      sortBy: [
      {
        id: columnSortedDefault.id,
        desc: columnSortedDefault.desc,
      }
    ]
    } }, 
    useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    // apply the table props
    <ListaItens {...getTableProps()}>
      <thead>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <ListaItens.Header {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {
                      // Render the header
                      column.render('Header')
                    }
                    <span>
                      {column.isSorted ? column.isSortedDesc ? ' ↓' : ' ↑' : ''}
                    </span>
                  </th>
                ))
              }
            </ListaItens.Header>
          ))
        }
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          rows.map((row) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <ListaItens.Item {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => {
                    // Apply the cell props
                    return (
                      <td {...cell.getCellProps()}>
                        {
                          // Render the cell contents
                          cell.render('Cell')
                        }
                      </td>
                    );
                  })
                }
              </ListaItens.Item>
            );
          })
        }
      </tbody>
    </ListaItens>
  );
};

export default Tabela;