import { StyleSheet } from "react-native";

export const stylesHistoria = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
  },
  resumenCard: {
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftColor: '#4CAF50',
  },
  resumenTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 8,
  },
  resumenText: {
    fontSize: 14,
    color: '#2E7D32',
    marginBottom: 4,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipoIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  tipo: {
    fontSize: 13,
    color: '#888',
    fontWeight: '600',
  },
  nombre: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  infoContainer: {
    gap: 2,
  },
  info: {
    fontSize: 14,
    color: '#555',
  },
  estado: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '600',
  },
  completado: {
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
  },
  enCurso: {
    backgroundColor: '#FFF8E1',
    color: '#EF6C00',
  },
  pendiente: {
    backgroundColor: '#E3F2FD',
    color: '#1565C0',
  },
});