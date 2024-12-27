import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert, Modal, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Button, Chip, Searchbar } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { Announcement, UserGroup, mockAnnouncements } from '@/types/announcement';
import FilterButtons from './FilterButton';
import AnnouncementForm from './AnnouncementForm';

const Announcements: React.FC = () => {
  const { colors } = useTheme();
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [newAnnouncement, setNewAnnouncement] = useState<Partial<Announcement>>({
    type: 'announcement',
    targetGroups: [],
  });
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'current' | 'past'>('all');
  const [filterCategory, setFilterCategory] = useState<Announcement['type'] | 'all'>('all');
  const [filterUserGroup, setFilterUserGroup] = useState<UserGroup | 'all'>('all');

  useEffect(() => {
    applyFilters();
  }, [announcements, searchQuery, filterType, filterCategory, filterUserGroup]);

  const applyFilters = () => {
    let filtered = announcements;

    if (searchQuery) {
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const now = new Date();
    if (filterType === 'current') {
      filtered = filtered.filter((a) => a.date >= now);
    } else if (filterType === 'past') {
      filtered = filtered.filter((a) => a.date < now);
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter((a) => a.type === filterCategory);
    }

    if (filterUserGroup !== 'all') {
      filtered = filtered.filter((a) => a.targetGroups.includes(filterUserGroup));
    }

    setFilteredAnnouncements(filtered);
  };

  const addOrUpdateAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.content && newAnnouncement.date && newAnnouncement.targetGroups && newAnnouncement.targetGroups.length > 0) {
      const announcement: Announcement = {
        id: newAnnouncement.id || Date.now().toString(),
        title: newAnnouncement.title,
        content: newAnnouncement.content,
        date: newAnnouncement.date,
        type: newAnnouncement.type || 'announcement',
        targetGroups: newAnnouncement.targetGroups,
        targetMajors: newAnnouncement.targetMajors,
        targetYears: newAnnouncement.targetYears,
        targetCourses: newAnnouncement.targetCourses,
        targetFaculties: newAnnouncement.targetFaculties,
      };

      if (isEditing) {
        setAnnouncements(announcements.map((a) => (a.id === announcement.id ? announcement : a)));
      } else {
        setAnnouncements([announcement, ...announcements]);
      }

      setNewAnnouncement({ type: 'announcement', targetGroups: [] });
      setIsAdding(false);
      setIsEditing(false);
    } else {
      Alert.alert('Invalid Input', 'Please fill in all required fields and select at least one target group.');
    }
  };

  const editAnnouncement = (announcement: Announcement) => {
    setNewAnnouncement({ ...announcement });
    setIsEditing(true);
    setIsAdding(true);
  };

  const deleteAnnouncement = (id: string) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this announcement?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => setAnnouncements(announcements.filter((a) => a.id !== id)) },
      ]
    );
  };

  const renderAnnouncementItem = ({ item }: { item: Announcement }) => (
    <View style={[styles.announcementItem, { backgroundColor: colors.card }]}>
      <View style={styles.announcementHeader}>
        <Chip
          mode="outlined"
          style={[styles.typeChip, { borderColor: getTypeColor(item.type) }]}
          textStyle={{ color: getTypeColor(item.type) }}
        >
          {item.type}
        </Chip>
        <Text style={[styles.announcementDate, { color: colors.text }]}>
          {item.date.toLocaleDateString()}
        </Text>
      </View>
      <Text style={[styles.announcementTitle, { color: colors.text }]}>{item.title}</Text>
      <Text style={[styles.announcementContent, { color: colors.text }]}>{item.content}</Text>
      <View style={styles.targetInfo}>
        {item.targetGroups.map((group) => (
          <Chip key={group} mode="outlined" style={styles.targetChip}>
            {group}
          </Chip>
        ))}
        {item.targetMajors?.map((major) => (
          <Chip key={major} mode="outlined" style={styles.targetChip}>
            {major}
          </Chip>
        ))}
        {item.targetYears?.map((year) => (
          <Chip key={year} mode="outlined" style={styles.targetChip}>
            Year {year}
          </Chip>
        ))}
        {item.targetCourses?.map((course) => (
          <Chip key={course} mode="outlined" style={styles.targetChip}>
            {course}
          </Chip>
        ))}
        {item.targetFaculties?.map((faculty) => (
          <Chip key={faculty} mode="outlined" style={styles.targetChip}>
            {faculty} Faculty
          </Chip>
        ))}
      </View>
      <View style={styles.actionButtons}>
        <Button
          icon={() => <Feather name="edit" size={18} color={colors.primary} />}
          onPress={() => editAnnouncement(item)}
          color={colors.primary}
          style={styles.actionButton}
        >
          Edit
        </Button>
        <Button
          icon={() => <Feather name="trash-2" size={18} color={colors.notification} />}
          onPress={() => deleteAnnouncement(item.id)}
          color={colors.notification}
          style={styles.actionButton}
        >
          Delete
        </Button>
      </View>
    </View>
  );

  const getTypeColor = (type: Announcement['type']) => {
    switch (type) {
      case 'event':
        return colors.primary;
      case 'deadline':
        return colors.notification;
      default:
        return colors.text;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Searchbar
        placeholder="Search announcements"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      <FilterButtons
        filterType={filterType}
        setFilterType={setFilterType}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        filterUserGroup={filterUserGroup}
        setFilterUserGroup={setFilterUserGroup}
      />
      <Button 
        mode="contained" 
        onPress={() => setIsAdding(true)} 
        style={styles.addButton}
        icon={() => <Feather name="plus" size={18} color={colors.background} />}
      >
        Add New
      </Button>
      <Modal visible={isAdding} animationType="slide" transparent={true}>
        <AnnouncementForm
          announcement={newAnnouncement}
          setAnnouncement={setNewAnnouncement}
          onSubmit={addOrUpdateAnnouncement}
          onCancel={() => {
            setIsAdding(false);
            setIsEditing(false);
            setNewAnnouncement({ type: 'announcement', targetGroups: [] });
          }}
          isEditing={isEditing}
        />
      </Modal>
      <FlatList
        data={filteredAnnouncements}
        renderItem={renderAnnouncementItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    marginBottom: 16,
  },
  addButton: {
    marginTop: 30,
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
  announcementItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeChip: {
    marginRight: 8,
  },
  announcementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  announcementContent: {
    fontSize: 14,
    marginBottom: 8,
  },
  announcementDate: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  targetInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  targetChip: {
    marginRight: 4,
    marginBottom: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  actionButton: {
    marginLeft: 8,
    marginBottom: 8,
  },
});

export default Announcements;

