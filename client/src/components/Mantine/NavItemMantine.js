import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const NavItemMantine = ({ icon, color, label }) => {

  const navigate = useNavigate();

    const handleSelection = () => {
      console.log(label)
        navigate(`/${label.toLowerCase().replace(/\s+/g, '')}`)
    }

    return (
      <UnstyledButton
        sx={(theme) => ({
          display: 'block',
          width: '100%',
          padding: theme.spacing.sm,
          borderRadius: theme.radius.sm,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
  
          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          }
        })}
        onClick={()=>handleSelection()}
      >
        <Group>
          <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon>
  
          <Text size="sm">{label}</Text>
        </Group>
      </UnstyledButton>
    );
  }
  
  export default NavItemMantine