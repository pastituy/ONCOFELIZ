import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function HistorialEmocional() {
  const router = useRouter();
  const [weeklyData, setWeeklyData] = useState([]);
  const idPadre = 1
  const getData = async () => {
    try {
      const response = await fetch("http://192.168.0.11:3000/data-paciente-mobile/idPadre", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      const data = await response.json();

      console.log(data)
    } catch (error) {
      ToastAndroid.show("Hubo un problema al traer los datos", ToastAndroid.LONG);
    }
  };
  useEffect(() => {
    const mockData = [
      { day: 'Lun', value: 6, date: '24 Jun' },
      { day: 'Mar', value: 7, date: '25 Jun' },
      { day: 'Mié', value: 5, date: '26 Jun' },
      { day: 'Jue', value: 8, date: '27 Jun' },
      { day: 'Vie', value: 6, date: '28 Jun' },
      { day: 'Sáb', value: 7, date: '29 Jun' },
      { day: 'Dom', value: 8, date: '30 Jun' },
    ];
    setWeeklyData(mockData);
  }, []);

  const getAverage = () => {
    const sum = weeklyData.reduce((acc, item) => acc + item.value, 0);
    return (sum / weeklyData.length).toFixed(1);
  };

  const getScoreColor = (score) => {
    if (score <= 3) return '#DC2626';
    if (score <= 5) return '#F59E0B';
    if (score <= 7) return '#84CC16';
    return '#10B981';
  };

  const getScoreLabel = (score) => {
    if (score <= 3) return 'Bajo';
    if (score <= 5) return 'Regular';
    if (score <= 7) return 'Bueno';
    return 'Excelente';
  };

  const SimpleChart = ({ data }) => (
    <View style={styles.chartContainer}>
      {data.map((item, index) => (
        <View key={index} style={styles.dayColumn}>
          <View style={styles.barContainer}>
            <View
              style={[
                styles.bar,
                {
                  height: `${(item.value / 10) * 100}%`,
                  backgroundColor: getScoreColor(item.value)
                }
              ]}
            />
          </View>
          <Text style={styles.dayLabel}>{item.day}</Text>
          <Text style={styles.valueLabel}>{item.value}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Historial Emocional</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>

        {/* Resumen rápido */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Promedio</Text>
              <Text style={[
                styles.summaryValue,
                { color: getScoreColor(parseFloat(getAverage())) }
              ]}>
                {getAverage()}/10
              </Text>
              <Text style={styles.summaryStatus}>
                {getScoreLabel(parseFloat(getAverage()))}
              </Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Esta semana</Text>
              <Text style={styles.summaryValue}>7 días</Text>
              <Text style={styles.summaryStatus}>Registrados</Text>
            </View>
          </View>
        </View>

        {/* Gráfico simple */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Últimos 7 días</Text>
          <SimpleChart data={weeklyData} />
        </View>

        {/* Lista compacta */}
        <View style={styles.listCard}>
          <Text style={styles.listTitle}>Detalle semanal</Text>
          {weeklyData.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <View>
                <Text style={styles.itemDay}>{item.day} {item.date}</Text>
              </View>
              <View style={styles.itemScore}>
                <Text style={[
                  styles.itemValue,
                  { color: getScoreColor(item.value) }
                ]}>
                  {item.value}/10
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Mensaje breve */}
        {parseFloat(getAverage()) < 5 && (
          <View style={styles.alertCard}>
            <Text style={styles.alertText}>
              💙 ¿Necesitas apoyo? Habla con nuestro asistente
            </Text>
            <TouchableOpacity
              style={styles.alertButton}
              onPress={() => router.push('/chatbot')}
            >
              <Text style={styles.alertButtonText}>Chatear ahora</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backText: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: '500',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1E293B',
  },
  content: {
    padding: 20,
    gap: 20,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 2,
  },
  summaryStatus: {
    fontSize: 12,
    color: '#64748B',
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
    textAlign: 'center',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    paddingHorizontal: 10,
  },
  dayColumn: {
    alignItems: 'center',
    flex: 1,
  },
  barContainer: {
    height: 80,
    width: 20,
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  bar: {
    width: '100%',
    borderRadius: 10,
    minHeight: 8,
  },
  dayLabel: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 2,
  },
  valueLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
  },
  listCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  itemDay: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
  itemScore: {
    alignItems: 'flex-end',
  },
  itemValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  alertCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
    alignItems: 'center',
  },
  alertText: {
    fontSize: 14,
    color: '#DC2626',
    textAlign: 'center',
    marginBottom: 12,
  },
  alertButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  alertButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});